import { useState } from "react";
import words from "../wordList.json";
import { Link } from "react-router-dom";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

const HangmanView = () => {
  const [wordToGuess, setWordToGuess] = useState(getWord);

  return (
    <div className="hangman">
      {wordToGuess}
      <button onClick={() => setWordToGuess(getWord())}>Nytt ord</button>
      <Link to="/start">TILLBAKA TILL START</Link>
    </div>
  );
};

export default HangmanView;
