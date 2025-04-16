import { useCallback, useEffect, useState } from "react";
import words from "../wordList.json";
import Drawing from "../components/Drawing";
import Word from "../components/Word";
import Keyboard from "../components/Keyboard";
import Nav from "../components/Nav";
import { IGameResultRequest } from "../models/IGameResultRequest";
import apiService from "../services/api-service";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

const HangmanView = () => {
  const [wordToGuess, setWordToGuess] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [confirmLosingGameAndNewWord, setConfirmLosingGameAndNewWord] =
    useState(false);
  const [error, setError] = useState<string | null>(null);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isWinner =
    wordToGuess === ""
      ? false
      : wordToGuess
          .split("")
          .every((letter) => guessedLetters.includes(letter));

  const isLoser = incorrectLetters.length >= 10;

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isWinner || isLoser) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  const sendGameResult = async (result: IGameResultRequest) => {
    try {
      await apiService.createNewGameResultAsync(result);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setGameIsRunning(false);
    }
  };

  useEffect(() => {
    if (isWinner) {
      const result: IGameResultRequest = {
        isWinner: true,
      };
      sendGameResult(result);
    } else if (isLoser) {
      const result: IGameResultRequest = {
        isWinner: false,
      };
      sendGameResult(result);
    }
  }, [isWinner, isLoser]);

  const startGame = () => {
    if (gameIsRunning) {
      setConfirmLosingGameAndNewWord(true);
    } else {
      setGuessedLetters([]);
      setWordToGuess(getWord());
      setGameIsRunning(true);
    }
  };

  const handleConfirmLosingGameAndNewWord = () => {
    const result: IGameResultRequest = {
      isWinner: false,
    };
    setConfirmLosingGameAndNewWord(false);
    sendGameResult(result);    
    startGame();
  };

  if (error)
    return (
      <>
        <div className="overlay" onClick={(e) => e.stopPropagation()} />
        <div className="middle-of-overlay">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Tillbaka</button>
        </div>
      </>
    );

  return (
    <div className="logged-in-container">
      <Nav gameIsRunning={gameIsRunning} />
      <div className="hangman">
        <div className="hangman-upper-part">
          <div className="new-word-and-result-message-container">
            <button className="new-word-btn" onClick={startGame}>
              Nytt ord
            </button>
            <div className="win-or-lose-message">
              {isWinner && (
                <div>
                  <p>Grattis! Du vann.</p>
                  <p>Tryck på knappen för att få fram ett nytt ord.</p>
                </div>
              )}
              {isLoser && (
                <div>
                  <p>Tyvärr, du förlorade.</p>
                  <p>Tryck på knappen för att få fram ett nytt ord.</p>
                </div>
              )}
            </div>
            <div className="word-desktop-view">
              <Word
                reveal={isLoser}
                guessedLetters={guessedLetters}
                wordToGuess={wordToGuess}
              />
            </div>
          </div>

          <Drawing numberOfIncorrectGuesses={incorrectLetters.length} />
        </div>

        <div className="word-mobile-view">
          <Word
            reveal={isLoser}
            guessedLetters={guessedLetters}
            wordToGuess={wordToGuess}
          />
        </div>

        <Keyboard
          addGuessedLetter={addGuessedLetter}
          correctLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          incorrectLetters={incorrectLetters}
          disabledBecauseGameIsOver={isWinner || isLoser}
        />

        {confirmLosingGameAndNewWord && (
          <>
            <div className="overlay" onClick={(e) => e.stopPropagation()} />
            <div className="middle-of-overlay">
              <p>Är du säker?</p>
              <p>Detta innebär en förlust i statistiken.</p>
              <button onClick={handleConfirmLosingGameAndNewWord}>JA</button>
              <button onClick={() => setConfirmLosingGameAndNewWord(false)}>
                AVBRYT
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HangmanView;
