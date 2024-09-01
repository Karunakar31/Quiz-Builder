import React, { useContext, useEffect } from "react";
import GlobalContext from "../../../context/GlobalContext";
import styles from './MyInfo.module.css';

const MyInfo = () => {
  const { user, getInfo } = useContext(GlobalContext);
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className={styles.myinfo}>
      <div className={styles.myinfocards}>
        <h6 style={{ color: "#FF5D01" }} className={styles.myinfocard}>
          <span className={styles.amount}>{user.quizCreated}</span>
          <span className={styles.label}>&nbsp;&nbsp; Quiz <br/>Created</span>
        </h6>

        <h6 style={{ color: "#60B84B" }} className={styles.myinfocard}>
          <span className={styles.amount}>{user.questionsCreated}</span>
          <span className={styles.label}> Questions Created</span>
        </h6>

        <h6 style={{ color: "#5076FF" }} className={styles.myinfocard}>
          <span className={styles.amount}>{user.totalImpressions}</span>
          <span className={styles.label}> Total Impressions</span>
        </h6>
      </div>
    </div>
  );
};

export default MyInfo;
