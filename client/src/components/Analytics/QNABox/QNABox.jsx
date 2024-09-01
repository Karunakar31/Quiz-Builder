import React from 'react'
import styles from './QNABox.module.css'

const QNABox = (props) => {
  const {question} = props;
  return (
    <>
     <div className={styles.boxes}>
            <div className={styles.box}>
                <h1>{question.attempts}</h1>
                <h3>People Attemted the question</h3>
            </div>
            <div className={styles.box}>
                <h1>{question.correct}</h1>
                <h3>People Answered Correctly</h3>
            </div>
            <div className={styles.box}>
                <h1>{question.incorrect}</h1>
                <h3>People Answered Incorrectly</h3>
            </div>
        </div>
    </>
  )
}

export default QNABox