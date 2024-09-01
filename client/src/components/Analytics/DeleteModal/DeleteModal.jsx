import React from 'react'
import styles from './DeleteModal.module.css'

const DeleteModal = (props) => {
  const {delete: handleDelete} = props;
  return (
    <div className={styles.deletemodal}>
        <div className={styles.delm}>
            <h1>Are you confirm you <br/>want to delete?</h1>
            <div className={styles.buttons}>
                <button className={styles.confirmbtn} onClick={handleDelete}>Confirm Delete</button>
                <button className={styles.cancelbtn} onClick={()=> props.setVisible(false)}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteModal