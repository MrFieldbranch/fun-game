const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "å",
  "ä",
  "ö",
];

type KeyboardProps = {
  disabledBecauseGameIsNotRunning?: boolean;
  correctLetters: string[];
  incorrectLetters: string[];
  addGuessedLetter: (letter: string) => void;
};

const Keyboard = ({
  disabledBecauseGameIsNotRunning,
  correctLetters,
  incorrectLetters,
  addGuessedLetter,
}: KeyboardProps) => {
  return (
    <div className="keyboard">
      {KEYS.map((letter) => {
        const isCorrect = correctLetters.includes(letter);
        const isIncorrect = incorrectLetters.includes(letter);
        return (
          <button
            key={letter}
            onClick={() => addGuessedLetter(letter)}
            className={`keyboard-btn ${isCorrect ? "correct-letter-btn" : ""} ${
              isIncorrect ? "incorrect-letter-btn" : ""
            }`}
            disabled={
              isCorrect || isIncorrect || disabledBecauseGameIsNotRunning
            }
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
