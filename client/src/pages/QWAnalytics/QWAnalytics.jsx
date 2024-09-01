import React from 'react';
import styles from "./QWAnalytics.module.css";
import QNAItem from '../../components/Analytics/QNAItem/QNAItem';
import formatDate from '../../utils/FormatDate';

const QWAnalytics = (props) => {
  const {questions, quiz} = props;
  
  let date = formatDate(quiz.createdOn);
  return (
    <div className={styles.qwacontainer}>
      <div className={styles.title}>
        {quiz.name} Question Analysis
        <div className={styles.littleinfo}>
          <h5>Created on: {date}</h5>
          <h5>Impression: {quiz.impressions}</h5>
        </div>
      </div>
      <div className={styles.items}>
          {
            questions.map((question, index)=>(
              <QNAItem key={index} question={question} index={index} />
            ))
          }
      </div>
    </div>
  )
}

export default QWAnalytics