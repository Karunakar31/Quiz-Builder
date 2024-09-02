import { createContext, useState } from "react";
import { toast } from "react-toastify";

const AnalyticsContext = createContext();
let url = import.meta.env.VITE_API_BASE_URL;
let clientUrl = import.meta.env.VITE_API_CLIENT_URL;

const AnalyticsState = (props) => {

    const [quizzes, setQuizzes] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [quiz, setQuiz] = useState({name: "", createdOn: "", impressions: 0});

    const toastMessage = (message, type) => {
        if (type === "success") toast.success(message);
        else if (type === "error") toast.error(message);
        else if (type === "warning") toast.warning(message);
        else toast.info(message);
        };

    const getAllQuizzes = async () => {
        try {
            const response = await fetch(`${url}/api/analytics/allquiz`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });
            const data = await response.json();
            if (data.success) {
                setQuizzes(data.quizzes);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    const getAllQuestions = async (quizid) => {
        try {
            const response = await fetch(`${url}/api/analytics/getquestions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({ quizid }),
            });
            const data = await response.json();
            if (data.success) {
                setQuestions(data.questions);
                setQuiz(data.quiz);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    const updateQuestion = async (questionID, question, option1, option2, option3, option4, option1img, option2img, option3img, option4img, timer, correctAnswer) => {
        try {
          const response = await fetch(`${url}/api/analytics/${questionID}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
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
            })
           
          });

          const data = await response.json();
          if (data.success) {
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      };

    const deleteQuiz = async (quizid) => {
        try {
            const response = await fetch(`${url}/api/quiz/${quizid}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });
            const data = await response.json();
            if (data.success) {
                toastMessage(data.info, "success");
                getAllQuizzes();
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }


    return (
        <AnalyticsContext.Provider value={{clientUrl, quizzes,deleteQuiz, getAllQuizzes, questions, getAllQuestions, updateQuestion, quiz}}>
            {props.children}
        </AnalyticsContext.Provider>
    )
}

export default AnalyticsContext;

export { AnalyticsState };