import { useState } from "react";
import words from "../wordList.json";
import { Link } from "react-router-dom";
import Drawing from "../components/Drawing";
import Word from "../components/Word";
import Keyboard from "../components/Keyboard";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

const HangmanView = () => {
  const [wordToGuess, setWordToGuess] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [isConfirmMode, setIsConfirmMode] = useState(false);

  const startGame = () => {
    if (gameIsRunning) {
      setIsConfirmMode(true);
    }
    setWordToGuess(getWord());
    setGameIsRunning(true);
  };

  const handleConfirm = () => {
	
  };

  return (
    <div className="hangman">
      {wordToGuess}
      <button onClick={startGame}>Nytt ord</button>
      {isConfirmMode && (
        <div className="confirm-or-cancel">
          <p>Är du säker?</p>
          <p>Detta innebär en förlust i statistiken.</p>
          <button onClick={handleConfirm}>JA</button>
          <button onClick={() => setIsConfirmMode(false)}>AVBRYT</button>
        </div>
      )}
      <Link to="/start">TILLBAKA TILL START</Link>
      <Drawing />
      <Word />
      <Keyboard />
    </div>
  );
};

export default HangmanView;
