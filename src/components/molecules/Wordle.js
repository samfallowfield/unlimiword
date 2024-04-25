import React from "react";
import { useState, useRef, useEffect } from "react";
import Row from "./Row";
import Keyboard from "./Keyboard";
import { LETTERS, potentialWords } from "../../data/lettersAndWords";

const SOLUTION = "table";
export default function Wordle() {
  const [guesses, setGuesses] = useState([
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
  ]);
  const [solutionFound, setSolutionFound] = useState(false);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  const [notification, setNotification] = useState("");
  const [activeRowIndex, setActiveRowIndex] = useState(0);
  const [failedGuesses, setFailedGuesses] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [presentLetters, setPresentLetters] = useState([]);
  const [absentLetters, setAbsentLetters] = useState([]);
  const wordleRef = useRef();

  useEffect(() => {
    wordleRef.current.focus(); /*  this is what makes the wordle box focusable  it uses wordleRef which is passed into the wordle component */
  }, []);

  const typeLetter = (letter) => {
    if (activeLetterIndex < 5) {
      setNotification("");

      let newGuesses = [...guesses];
      newGuesses[activeRowIndex] = replaceCharacter(
        newGuesses[activeRowIndex],
        activeLetterIndex,
        letter
      );

      setGuesses(newGuesses);
      setActiveLetterIndex((index) => index + 1);
    }
  };

  const replaceCharacter = (string, index, character) => {
    return (
      string.slice(0, index) +
      character +
      string.slice(index + character.length)
    );
  };

  const hitEnter = () => {
    if (activeLetterIndex === 5) {
      const currentGuess = guesses[activeRowIndex];
      if (!potentialWords.includes(currentGuess)) {
        setNotification("Not in the word list");
      } else if (failedGuesses.includes(currentGuess)) {
        setNotification("Already guessed");
      } else if (currentGuess === SOLUTION) {
        setSolutionFound(true);
        setNotification("You Win!");
        setCorrectLetters([...SOLUTION]);
      } else {
        let correctLetters = [];

        [...currentGuess].forEach((letter, index) => {
          if (SOLUTION[index] === letter) correctLetters.push(letter);
        });
        setCorrectLetters([
          ...new Set(correctLetters),
        ]); /* over kill but it is incase there a multiple correct same letter in a word */

        setPresentLetters([
          ...presentLetters,
          ...[...currentGuess].filter((letter) => SOLUTION.includes(letter)),
        ]); /* the filer creates a new array with only letters that are included in the solution, then it is added to a new array with the present letters */

        setAbsentLetters([
          ...absentLetters,
          ...[...currentGuess].filter((letter) => !SOLUTION.includes(letter)),
        ]);

        setFailedGuesses([...failedGuesses, currentGuess]);
        setActiveRowIndex((index) => index + 1);
        setActiveLetterIndex(0);
      }
    } else {
      setNotification("5 letter words only");
    }
  };

  const hitBackspace = () => {
    //todo
  };
  const handleKeyDown = (event) => {
    if (solutionFound) return;
    if (LETTERS.includes(event.key)) {
      typeLetter(event.key);
      return;
    }

    if (event.key === "Enter") {
      hitEnter();
      return;
    }

    if (event.key === "Backspace") {
      hitBackspace();
      return;
    }
  };
  return (
    <div
      className="wordle"
      ref={wordleRef}
      tabIndex="0"
      onBlur={(e) => {
        /* this is what happens when you click outside the wordle box to bring focus back */
        e.target.focus();
      }}
      onKeyDown={handleKeyDown}
    >
      <div className={`notification ${solutionFound && "notification--green"}`}>
        {notification}
      </div>
      {guesses.map((guess, index) => {
        return <Row key={index} word={guess} />;
      })}
    </div>
  );
}
