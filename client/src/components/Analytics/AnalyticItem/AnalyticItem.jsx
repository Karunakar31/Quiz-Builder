import React, {useContext, useState} from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoMdShare } from "react-icons/io";
import styles from "./AnalyticItem.module.css";
import formatDate from "../../../utils/FormatDate";
import GlobalContext from "../../../context/GlobalContext";
import AnalyticsContext from "../../../context/AnalyticsContext";
import DeleteModal from "../DeleteModal/DeleteModal";

const AnalyticItem = (props) => {

  const {setIsSingle, index, setIsEdit, quiz} = props;
  const {getAllQuestions, deleteQuiz, clientUrl} = useContext(AnalyticsContext);
  const {toastMessage} = useContext(GlobalContext);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  

  const handleQuestionWiseAnalysis = async () => {
    await getAllQuestions(quiz.quizID);
    setIsSingle(true);
  }

  let date = formatDate(quiz.createdOn);

  const handleEdit = async () => {
    await getAllQuestions(quiz.quizID);
    setIsEdit(true);
  }

  const handleDelete = async () => {
    const ans = await deleteQuiz(quiz.quizID);
    if(ans){
      setIsDeleteModal(false);
    }
  }

  const handleCopy = () => {
    const url = `${clientUrl}/quiz/${quiz.quizID}`;
    navigator.clipboard.writeText(url);
    toastMessage("Link copied to Clipboard!", "success");
  }

  return (
    <>
      {isDeleteModal && <DeleteModal delete={handleDelete} setVisible={setIsDeleteModal} />}
      <tr>
        <td>{index+1}</td>
        <td>{quiz.name}</td>
        <td>{date}</td>
        <td>{quiz.impressions}</td>
        <td>
          <BiEdit onClick={()=> handleEdit()}className={styles.editicon} />
          <RiDeleteBin6Fill onClick={()=> setIsDeleteModal(true)} className={styles.deleteicon} />
          <IoMdShare onClick={()=> handleCopy()} className={styles.shareicon}/>
        </td>
        <td className={styles.qwa}>
            <div onClick={handleQuestionWiseAnalysis}>Question Wise Analysis</div>
        </td>
      </tr>
    </>
  );
};

export default AnalyticItem;
