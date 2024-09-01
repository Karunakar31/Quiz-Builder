import React, {useContext} from 'react'
import { RxCross2 } from "react-icons/rx";
import QuizContext from '../../../context/QuizContext';
import styles from './Congrats.module.css'

const Congrats = (props) => {
    const {setShowModal} = props
    const {toastMessage, shareLink} = useContext(QuizContext);

    const url = shareLink;

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        toastMessage("Copied to clipboard!", "success");
    }
  return (
    <div className={styles.cong}>
        <div className={styles.cross}>
            <RxCross2 onClick={()=> setShowModal(false)} />
        </div>
        <h2>Congrats your Quiz is <br/> Published!</h2>
        <input type='text' value={url} disabled />
        <button onClick={handleCopy} className={styles.share}>Share</button>
    </div>
  )
}

export default Congrats