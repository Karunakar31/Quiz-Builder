import React, {useState} from 'react'
import QuizModalPage1 from '../QuizModalPage1/QuizModalPage1'
import QuizModalPage2 from '../QuizModalPage2/QuizModalPage2';
import Congrats from '../Congrats/Congrats';
import styles from './CreateQuizModal.module.css';


const CreateQuizModal = (props) => {
    const {setShowModal} = props
    const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className={styles.modal}>
        { currentPage === 0 && <QuizModalPage1 setShowModal={setShowModal} setCurrentPage={setCurrentPage} /> }
        { currentPage === 1 && <QuizModalPage2 setShowModal={setShowModal} setCurrentPage={setCurrentPage} /> }
        { currentPage === 2 && <Congrats setShowModal={setShowModal} setCurrentPage={setCurrentPage} /> }
    </div>
  )
}

export default CreateQuizModal