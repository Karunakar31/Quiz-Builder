import React, {useState} from 'react'
import  styles from "./Quiz.module.css"
import Congratulations from '../../components/Quiz/Congratualations/Congratulations'
import Questions from '../../components/Quiz/Questions/Questions'

const Quiz = () => {
  const [isFinished, setIsFinished] = useState(false);
  return (
    <div className={styles.quizcontainer}>
      {isFinished ? <Congratulations /> : <Questions setIsFinished={setIsFinished} />}
    </div>
  )
}

export default Quiz