"use client";

import React, { useEffect, useState } from "react";
import WordInfo from "./WordInfo";
import WordInput from "./WordInput";
import styles from "../../styles/classic/GameBox.module.css";
import { checkValidInput, upperCaseFirstLetter } from "@/utils/utils";
import SuccessPopup from "./successPopup";
import ScoreCounter from "./scoreCount";

const ATTEMPTS_PER_WORD = 3;

// Container for WordInfo and WordInput
const GameBox = () => {
//defines varibles being used
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);


  // the gamebox component controls the flow of the game
  // When it is rendered, it must fetch a random word from the API
  // As long as the user has enough retries, everytime the word input is
  // entered and submit is clicked, the word is validated, and
  // if correct -> get a new word and reset, and rerender
  // if wrong -> if there are more retries then clear out input (need function for that) and increase retries
  // -> if not then print wrong and reset and rerender

  const setupRound = () => {
    //defines logic for every time a new word is fetched
    fetch("/api/randword", { cache: "no-store" })
      .then((response) => response.json())
      .then((wordData) => {
        setWord(wordData.word);
        setDefinition(wordData.definition);
        setAudioUrl(wordData.audioUrl);
        setAttempts(0);
      });
  };

  const checkUserInput = (input) => {
    if (checkValidInput(input, word)) {
      let pointsToAdd = 0;

    if (attempts === 0) {
      pointsToAdd = 3; // Correct on the first try
    } else if (attempts === 1) {
      pointsToAdd = 2; // Correct on the second try
    } else if (attempts === 2) {
      pointsToAdd = 1; // Correct on the third try
    }

      setIsCorrect(true) //CORRECT POPUP
      setScore(score + pointsToAdd); // Update the score

      setupRound(); //new word
      //make popup disappear after 1.5 seconds
      setTimeout(() => setIsCorrect(null), 1500);
    } else {
      if (attempts + 1 >= ATTEMPTS_PER_WORD) {
        //retract 1 point from the score
        setScore((prevScore) => prevScore - 1);
        setIsCorrect(false) //INCORRECT POPUP
        alert(
          `Wrong. Again. \n Out of attempts! Correct spelling: \"${word}\"`
        );        
        setupRound();
        setTimeout(() => setIsCorrect(null), 1500);
      } else {
        setIsCorrect(false) //INCORRECT POPUP
        //reduce attempts remaining by 1
        setAttempts(attempts + 1);
        setTimeout(() => setIsCorrect(null), 1500);
      }
    }
  };

  useEffect(() => setupRound(), []);

  return (
    //Places content in gamebox
    <div className={styles.container}>
      <div className={styles.popupContainer}><SuccessPopup key={isCorrect} isCorrect={isCorrect}/></div>
      
      <div className={styles.attemptsSkipContainer}>
        <div className={styles.linkContainer}>
          <a className={`${styles.link} ${styles.linkLeft}`}>
            <div>
              <p className={styles.linkText}>
                {/*displays attempts remaining*/}
                Attemps remaining: {ATTEMPTS_PER_WORD - attempts}
              </p>
            </div>
          </a>
        </div>
        <div className={styles.linkContainer}>
          <a
            className={`${styles.link} ${styles.linkRight}`}
            onClick={() => {
              setupRound();
            }}
          >
            <div>
              <p className={styles.linkText}>Skip</p>
            </div>
          </a>
        </div>
      </div>
       <div className={styles.mainContainer} >
          {/*gets the definition and audio from the current word*/}
          <WordInfo
            definition={upperCaseFirstLetter(definition[0])}
            audioUrl={audioUrl}
          />
          <br />
          <br />
          <br />
          
          <WordInput onSubmitHandler={checkUserInput} />
          {/*calls the score counter passing score as a prop*/}
          <ScoreCounter score={score}/>
        </div>
    </div>
  );
};

export default GameBox;
