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
          style={{
            borderBottom: "0.5rem solid black",
            height: "6.2rem",
            display: "inline-block",
            width: "4rem",
            textAlign: "center",
          }}
        >
          <span
            style={{
              visibility:
                guessedLetters.includes(letter) || reveal
                  ? "visible"
                  : "hidden",
              color:
                !guessedLetters.includes(letter) && reveal ? "red" : "black",
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
