import React, {useState, useContext} from "react";
import Image from "../../../assets/congrats.png";
import QuizContext from "../../../context/QuizContext";
import styles from './Congratulations.module.css';

const Congratulations = () => {
  const {result} = useContext(QuizContext);
  return (
    <div className={styles.quizcompleted}>
      {result.total<=0 ? (
        <h1 className={styles.thankyou}>Thank you <br/>for participating in <br/> the Poll</h1>
      ) : (
        <>
          <h1>Congrats Quiz is completed</h1>
          <img src={Image} alt="cong" />
          <h1>
            Your score is <span className={styles.score}>0{result.score}/0{result.total}</span>
          </h1>
        </>
      )}
    </div>
  );
};

export default Congratulations;
