import React, {useState, useContext, useEffect} from "react";
import styles from "./Analytics.module.css";
import AnalyticItem from "../../components/Analytics/AnalyticItem/Analyticitem.jsx";
import EditQuizModal from "../../components/Analytics/EditQuizModal/EditQuizModal.jsx";
import QWAnalytics from "../QWAnalytics/QWAnalytics.jsx";
import AnalyticsContext from "../../context/AnalyticsContext";


const Analytics = () => {
  const [isSingle, setIsSingle] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const {quizzes, getAllQuizzes, questions, quiz} = useContext(AnalyticsContext);

  useEffect(() => {
    getAllQuizzes();
  }, [])

  return (
    <>
    {isEdit && <EditQuizModal questions={questions} setIsEdit ={setIsEdit}/>}
      {isSingle ? (
        <QWAnalytics questions={questions} quiz={quiz} />
      ) : (
        <>
          <div className={styles.analysis}>
            <h1 className={styles.analtitle}>Quiz Analysis</h1>
            <div className={styles.analtable}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Quiz Name</th>
                    <th>Created On</th>
                    <th>Impression</th>
                    <th> </th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {quizzes.map((quiz, index) => (
                    <AnalyticItem key={index} quiz={quiz} setIsEdit ={setIsEdit} setIsSingle={setIsSingle} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Analytics;
