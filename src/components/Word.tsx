type WordProps = {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
};

const Word = ({ guessedLetters, wordToGuess, reveal = false }: WordProps) => {
  return (
    <div className="word">
      {wordToGuess.split("").map((letter, index) => (
        <span
          key={index}
		  className="word-outer-span"          
        >
          <span
            style={{
              visibility:
                guessedLetters.includes(letter) || reveal
                  ? "visible"
                  : "hidden",
              color:
                !guessedLetters.includes(letter) && reveal ? "red" : "white",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
};

export default Word;
