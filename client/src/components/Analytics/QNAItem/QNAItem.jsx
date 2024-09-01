import React from 'react'
import styles from './QNAItem.module.css'
import QNABox from '../QNABox/QNABox'
import PollBox from '../PollBox/PollBox'

const QNAItem = (props) => {
  const {question, index} = props;

  const type = question.type;

  return (
    <div className={styles.qnaitem}>
        <h2>Q.{index+1} {question.question}</h2>
            {
                type === 'poll' ? <PollBox question={question} /> : <QNABox question={question} />
            }
        <hr />
    </div>
  )
}

export default QNAItem