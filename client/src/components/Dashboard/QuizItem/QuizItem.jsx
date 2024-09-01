import React from 'react'
import { AiOutlineEye } from "react-icons/ai";
import formatDate from '../../../utils/FormatDate';
import styles from './QuizItem.module.css';

const QuizItem = (props) => {
  const {quiz} = props;

  let date = formatDate(quiz.createdOn);

  return (
    <div className={styles.quizitem}>
        <div className={styles.top}>
            <div className={styles.quizitemtitle}>{quiz.name}</div>
            <div className={styles.quizviews}>
                {quiz.impressions}
                <AiOutlineEye className={styles.viewicon} />
            </div>
        </div>
        <div className={styles.quizcreated}>Created on : {date}</div>
    </div>
  )
}

export default QuizItem