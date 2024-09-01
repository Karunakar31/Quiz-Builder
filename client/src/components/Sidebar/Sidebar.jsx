import React, {useState, useContext} from "react";
import styles from "./Sidebar.module.css";
import CreateQuizModal from "../Create/CreateQuizModal/CreateQuizModal";
import GlobalContext from "../../context/GlobalContext";
import {useNavigate} from 'react-router-dom'

const Sidebar = (props) => {
  const { changeSelected, selected } = props;
  const [showModal, setShowModal] = useState(false);
  const {handleLogout} = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleLogoutClick = async ()=>{
    let res = await handleLogout();
    if(res){
      navigate('/login')
    }
  }

  return (
    <>
    {showModal && <CreateQuizModal setShowModal={setShowModal} />}
    <div className={styles.sidebar}>
      <h2 className={styles.title}>QUIZZIE</h2>

      <div className={styles.sidemenu}>
        <div
          onClick={() => changeSelected(0)}
          className={`${styles.sidemenuitem} ${selected === 0 && styles.selected}`}
        >
          Dashboard
        </div>
        <div onClick={() => changeSelected(1)} className={`${styles.sidemenuitem} ${selected === 1 && styles.selected}`}>
          Analytics
        </div>
        <div onClick={() => setShowModal(true)} className={`${styles.sidemenuitem}`}>
          Create Quiz
        </div>
      </div>
      <div className={styles.footer}>
        <hr />
        <h6 onClick={handleLogoutClick} className={styles.logout}>LOGOUT</h6>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
