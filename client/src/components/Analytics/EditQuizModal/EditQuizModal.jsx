import React, { useContext, useRef, useState, useEffect } from "react";
import styles from './EditQuizModal.module.css'
import GlobalContext from "../../../context/GlobalContext";
import AnalyticsContext from "../../../context/AnalyticsContext";

const EditQuizModal = (props) => {
  const {questions} = props;
 
  const { toastMessage } = useContext(GlobalContext);
  const { updateQuestion} = useContext(AnalyticsContext);
  const [questionType, setQuestionType] = useState("text");
  const [selectedOption, setSelectedOption] = useState(-1);
  const [selectedTimer, setSelectedTimer] = useState("0");
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [quizType, setQuizType] = useState("")
  const [options, setOptions] = useState([0, 1]);
  const [updquizData, setUpdquizData] = useState({});
  const [accessedIndices, setAccessedIndices] = useState({ 0: true });
  const [newQuizData, setNewQuizData] = useState({});


  useEffect(() => {
    let index=0;
    populate(index);
    const qtype = questions[index].type;
    setQuizType(qtype);
    },[]);


  const handleCleanup = () => {
    props.setIsEdit(false);
  };

  const questionRef = useRef();
  const optionRef = [useRef(), useRef(), useRef(), useRef()];
  const optionImgRef = [useRef(), useRef(), useRef(), useRef()];


  const saveChanges = () => {
    const question = questionRef.current.value;
    if (!question) {
      toastMessage("Please enter a question", "warning");
      return;
    }

    if (question.length < 3) {
      toastMessage("Please enter a question with more than 3 characters", "warning");
      return;
    }

    let option1,
      option2,
      option3,
      option4,
      option1img,
      option2img,
      option3img,
      option4img,
      timer;

    if (optionRef[0].current) {
      if (!optionRef[0].current.value) {
        toastMessage("Please enter option 1", "warning");
        return;
      }
      option1 = optionRef[0].current.value;
    }

    if (optionRef[1].current) {
      if (!optionRef[1].current.value) {
        toastMessage("Please enter option 2", "warning");
        return;
      }
      option2 = optionRef[1].current.value;
      if(option2 === option1){
        toastMessage("Please enter different options", "warning");
        return;
      }
    }

    if (optionRef[2].current) {
      if (!optionRef[2].current.value) {
        toastMessage("Please enter option 3", "warning");
        return;
      }
      option3 = optionRef[2].current.value;
        if(option3 === option1 || option3 === option2){
            toastMessage("Please enter different options", "warning");
            return;
        }
    }

    if (optionRef[3].current) {
      if (!optionRef[3].current.value) {
        toastMessage("Please enter option 4", "warning");
        return;
      }
      option4 = optionRef[3].current.value;
        if(option4 === option1 || option4 === option2 || option4 === option3){
            toastMessage("Please enter different options", "warning");
            return;
        }
    }

    if (optionImgRef[0].current) {
      if (!optionImgRef[0].current.value) {
        toastMessage("Please enter option 1 image URL", "warning");
        return;
      }
      option1img = optionImgRef[0].current.value;
    }

    if (optionImgRef[1].current) {
      if (!optionImgRef[1].current.value) {
        toastMessage("Please enter option 2 image URL", "warning");
        return;
      }
      option2img = optionImgRef[1].current.value;
      if(option2img === option1img){
        toastMessage("Please enter different options", "warning");
        return;
      }
    }

    if (optionImgRef[2].current) {
      if (!optionImgRef[2].current.value) {
        toastMessage("Please enter option 3 image URL", "warning");
        return;
      }
      option3img = optionImgRef[2].current.value;
        if(option3img === option1img || option3img === option2img){
            toastMessage("Please enter different options", "warning");
            return;
        }
    }

    if (optionImgRef[3].current) {
      if (!optionImgRef[3].current.value) {
        toastMessage("Please enter option 4 image URL", "warning");
        return;
      }
      option4img = optionImgRef[3].current.value;
        if(option4img === option1img || option4img === option2img || option4img === option3img){
            toastMessage("Please enter different options", "warning");
            return;
        }
    }

    let correctAnswer = "";
    if (selectedOption === 0) {
      if (optionRef[0].current) {
        correctAnswer += optionRef[0].current.value;
      }
      correctAnswer += "@1&2^";
      if (optionImgRef[0].current) {
        correctAnswer += optionImgRef[0].current.value;
      }
    }

    if (selectedOption === 1) {
      if (optionRef[1].current) {
        correctAnswer += optionRef[1].current.value;
      }
      correctAnswer += "@1&2^";
      if (optionImgRef[1].current) {
        correctAnswer += optionImgRef[1].current.value;
      }
    }

    if (selectedOption === 2) {
      if (optionRef[2].current) {
        correctAnswer += optionRef[2].current.value;
      }
      correctAnswer += "@1&2^";
      if (optionImgRef[2].current) {
        correctAnswer += optionImgRef[2].current.value;
      }
    }

    if (selectedOption === 3) {
      if (optionRef[3].current) {
        correctAnswer += optionRef[3].current.value;
      }
      correctAnswer += "@1&2^";
      if (optionImgRef[3].current) {
        correctAnswer += optionImgRef[3].current.value;
      }
    }
    
    timer = selectedTimer;

    
    newQuizData[selectedQuestion] = {
        id : questions[selectedQuestion]._id,
        index: selectedQuestion,
        question,
        option1,
        option2,
        option3,
        option4,
        option1img,
        option2img,
        option3img,
        option4img,
        timer,
        correctAnswer
      };
    setUpdquizData((prevData) => ({ ...prevData, ...newQuizData }));
    return true;
  };

  const handleQuestionSelect = (index) => {
    let ans = saveChanges();
    if (!ans) return;
    setSelectedQuestion(index);
    // setSelectedOption(-1);
    setOptions([0, 1]);
    if (accessedIndices[index]) {
      updpopulate(index);
    } else {
      populate(index);
      setAccessedIndices((prevIndices) => ({ ...prevIndices, [index]: true}));
    }
  };

  const reset = () => {};

  const populate = async (index) => {
    
    if (!questions[index].value) reset();
    if (questions[index].optionType === "text") setQuestionType("text");
    else if (questions[index].optionType === "img") setQuestionType("imageUrl");
    else if (questions[index].optionType === "both")
      setQuestionType("textAndImageUrl");

    let ca = questions[index].correctAnswer;
    if (questions[index].optionType === "text") {
      let ans = ca.split("@1&2^");
      if (ans[0] === questions[index].options[0]) setSelectedOption(0);
      else if (ans[0] === questions[index].options[1]) setSelectedOption(1);
      else if (ans[0] === questions[index].options[2]) setSelectedOption(2);
      else if (ans[0] === questions[index].options[3]) setSelectedOption(3);
    } else if (questions[index].optionType === "img") {
      let ans = ca.split("@1&2^");
      if (ans[1] === questions[index].imageOptions[0]) setSelectedOption(0);
      else if (ans[1] === questions[index].imageOptions[1])
        setSelectedOption(1);
      else if (ans[1] === questions[index].imageOptions[2])
        setSelectedOption(2);
      else if (ans[1] === questions[index].imageOptions[3])
        setSelectedOption(3);
    } else if (questions[index].optionType === "both") {
      let ans = ca.split("@1&2^");
      if (
        ans[0] === questions[index].options[0] &&
        ans[1] === questions[index].imageOptions[0]
      )
        setSelectedOption(0);
      else if (
        ans[0] === questions[index].options[1] &&
        ans[1] === questions[index].imageOptions[1]
      )
        setSelectedOption(1);
      else if (
        ans[0] === questions[index].options[2] &&
        ans[1] === questions[index].imageOptions[2]
      )
        setSelectedOption(2);
      else if (
        ans[0] === questions[index].options[3] &&
        ans[1] === questions[index].imageOptions[3]
      )
        setSelectedOption(3);
    }
    setSelectedTimer(questions[index].timer);

    questionRef.current.value = questions[index].question;
    if (questions[index].options[0]) {
      setTimeout(() => {
        optionRef[0].current.value = questions[index].options[0];
      }, 100);
    }
    if (questions[index].options[1]) {
      setTimeout(() => {
        optionRef[1].current.value = questions[index].options[1];
      }, 100);
    }
    if (questions[index].options[2]) {
      setOptions([1, 2, 3]);
      setTimeout(() => {
        optionRef[2].current.value = questions[index].options[2];
      }, 100);
    }
    if (questions[index].options[3]) {
      setOptions([1, 2, 3, 4]);
      setTimeout(() => {
        optionRef[3].current.value = questions[index].options[3];
      }, 100);
    }
    if (questions[index].imageOptions[0]) {
      setTimeout(() => {
        optionImgRef[0].current.value = questions[index].imageOptions[0];
      }, 100);
    }
    if (questions[index].imageOptions[1]) {
      setTimeout(() => {
        optionImgRef[1].current.value = questions[index].imageOptions[1];
      }, 100);
    }
    if (questions[index].imageOptions[2]) {
      setOptions([1, 2, 3]);
      setTimeout(() => {
        optionImgRef[2].current.value = questions[index].imageOptions[2];
      }, 100);
    }
    if (questions[index].imageOptions[3]) {
      setOptions([1, 2, 3, 4]);
      setTimeout(() => {
        optionImgRef[3].current.value = questions[index].imageOptions[3];
      }, 100);
    }
  };


  const updpopulate = async (index) => {
    if (!updquizData) reset();
    if (questions[index].optionType === "text") setQuestionType("text");
    else if (questions[index].optionType === "img") setQuestionType("imageUrl");
    else if (questions[index].optionType === "both")
      setQuestionType("textAndImageUrl");

    let ca = questions[index].correctAnswer;
    if (questions[index].optionType === "text") {
      let ans = ca.split("@1&2^");
      if (ans[0] === questions[index].options[0]) setSelectedOption(0);
      else if (ans[0] === questions[index].options[1]) setSelectedOption(1);
      else if (ans[0] === questions[index].options[2]) setSelectedOption(2);
      else if (ans[0] === questions[index].options[3]) setSelectedOption(3);
    } else if (questions[index].optionType === "img") {
      let ans = ca.split("@1&2^");
      if (ans[1] === questions[index].imageOptions[0]) setSelectedOption(0);
      else if (ans[1] === questions[index].imageOptions[1])
        setSelectedOption(1);
      else if (ans[1] === questions[index].imageOptions[2])
        setSelectedOption(2);
      else if (ans[1] === questions[index].imageOptions[3])
        setSelectedOption(3);
    } else if (questions[index].optionType === "both") {
      let ans = ca.split("@1&2^");
      if (
        ans[0] === questions[index].options[0] &&
        ans[1] === questions[index].imageOptions[0]
      )
        setSelectedOption(0);
      else if (
        ans[0] === questions[index].options[1] &&
        ans[1] === questions[index].imageOptions[1]
      )
        setSelectedOption(1);
      else if (
        ans[0] === questions[index].options[2] &&
        ans[1] === questions[index].imageOptions[2]
      )
        setSelectedOption(2);
      else if (
        ans[0] === questions[index].options[3] &&
        ans[1] === questions[index].imageOptions[3]
      )
        setSelectedOption(3);
    }
    if(updquizData[index].timer) {
    setSelectedTimer(updquizData[index].timer);}

    questionRef.current.value = updquizData[index].question;
    if (updquizData[index].option1) {
      setTimeout(() => {
        optionRef[0].current.value = updquizData[index].option1;
      }, 100);
    }
    if (updquizData[index].option2) {
      setTimeout(() => {
        optionRef[1].current.value = updquizData[index].option2;
      }, 100);
    }
    if (updquizData[index].option3) {
      setOptions([1, 2, 3]);
      setTimeout(() => {
        optionRef[2].current.value = updquizData[index].option3;
      }, 100);
    }
    if (updquizData[index].option4) {
      setOptions([1, 2, 3, 4]);
      setTimeout(() => {
        optionRef[3].current.value = updquizData[index].option4;
      }, 100);
    }
    if (updquizData[index].option1img) {
      setTimeout(() => {
        optionImgRef[0].current.value = updquizData[index].option1img;
      }, 100);
    }
    if (updquizData[index].option2img) {
      setTimeout(() => {
        optionImgRef[1].current.value = updquizData[index].option2img;
      }, 100);
    }
    if (updquizData[index].option3img) {
      setOptions([1, 2, 3]);
      setTimeout(() => {
        optionImgRef[2].current.value = updquizData[index].option3img;
      }, 100);
    }
    if (updquizData[index].option4img) {
      setOptions([1, 2, 3, 4]);
      setTimeout(() => {
        optionImgRef[3].current.value = updquizData[index].option4img;
      }, 100);
    }
  };

  const handleUpdateQuiz = async () => {
    const ans = saveChanges();
    if (!ans) return;
  
    Object.keys(updquizData).forEach((key) => {
      const current = updquizData[key];
      console.log(current.timer)
      updateQuestion(
        current.id,
        current.question,
        current.option1,
        current.option2,
        current.option3,
        current.option4,
        current.option1img,
        current.option2img,
        current.option3img,
        current.option4img,
        current.timer,
        current.correctAnswer,
        key
      );
    });
    props.setIsEdit(false);
    toastMessage("Updated Successfully", "success");
  };




const handleSelectOption = () => {
    toastMessage("Not allowed", "warning");
    return;
}

const handleSelectTimer = (index) => {
  setSelectedTimer(index);
  setTimeout(() => {
    saveChanges();
  }, 100);
}

const handleSelectOptionType = () => {
    toastMessage("Not allowed", "warning");
    return;
}

  return (
    <div className={styles.overlay}>
    <div className={styles.page2}>
      <div className={styles.topbar}>
        <div className={styles.topbarleft}>
          {questions.map(({question}, index) => {
            return (
              <div
                onClick={() => handleQuestionSelect(index)}
                key={index}
                className={`${styles.questionselector} ${selectedQuestion === index && styles.selected}`}
              >
                <h6>{index + 1}</h6>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.question}>
        <input onBlur={saveChanges} ref={questionRef} type="text" placeholder="Poll Question" />
      </div>
      <div className={styles.questiontype}>
        <p>Question Type</p>
        <div className={styles.questiontypebtns}>
          <label>
            <input
              type="radio"
              name="questionType"
              className=""
              value="text"
              checked={questionType === "text"}
              onChange={() => handleSelectOptionType()}
            />
            Text
          </label>
          <label>
            <input
              type="radio"
              name="questionType"
              className=""
              value="imageUrl"
              checked={questionType === "imageUrl"}
              onChange={() => handleSelectOptionType()}
            />
            Image URL
          </label>
          <label>
            <input
              type="radio"
              name="questionType"
              className=""
              value="textAndImageUrl"
              checked={questionType === "textAndImageUrl"}
              onChange={() => handleSelectOptionType()}
            />
            Text & Image URL
          </label>
        </div>
      </div>
      <div className={styles.bottombar}>
        <div className={styles.bottomleft} >
          {options.map((option, index) => {
            return (
              <div className={styles.optionnnn}>
                <label key={index}>
                  { quizType!=="poll"&&
                  <input
                    type="radio"
                    name="option"
                    className="btnopt"
                    value={option}
                    checked={selectedOption === index}
                    onChange={() => handleSelectOption()}
                  />}
                  {(questionType === "text" ||
                    questionType === "textAndImageUrl") && (
                    <input
                      ref={optionRef[index]}
                      className={`${selectedOption === index && styles.selected}`}
                      type="text"
                      placeholder="Text"
            
                      onBlur={saveChanges}
                    />
                  )}
                  {(questionType === "imageUrl" ||
                    questionType === "textAndImageUrl") && (
                    <input
                      ref={optionImgRef[index]}
                      className={`${selectedOption === index && styles.selected} imageoption`}
                      type="text"
                      placeholder="Image URL"
                     
                      onBlur={saveChanges}
                    />
                  )}
                </label>
              </div>
            );
          })}

        </div>
        <div className={styles.bottomright}>
          {quizType!=="poll"&&<div className={styles.timeroptions}>
            <h6>Timer</h6>
            <div
              className={`${styles.timer} ${selectedTimer === "0" ? styles.selected : ''}`}
              onClick={() => handleSelectTimer("0")}
            >
              OFF
            </div>
            <div
              className={`${styles.timer} ${selectedTimer === "5" ? styles.selected : ''}`}
              onClick={() => handleSelectTimer("5")}
            >
              5 sec
            </div>
            <div
              className={`${styles.timer} ${selectedTimer === "10" ? styles.selected : ''}`}
              onClick={() => handleSelectTimer("10")}
            >
              10 sec
            </div>
          </div>}
        </div>
      </div>
      <div className={styles.cancelconfirm}>
        <button onClick={handleCleanup} className={styles.cancelbtn}>
          Cancel
        </button>
        <button onClick={handleUpdateQuiz} className={styles.confirmbtn}>Update Quiz</button>
      </div>
    </div>
    </div>
  );
};

export default EditQuizModal;
