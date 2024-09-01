const dotenv = require("dotenv");
dotenv.config();

const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const User = require("../models/User");

const convertToK = (num) => {
    return num > 999 ? (num / 1000).toFixed(1) + "K" : num;
};

const getAllQuiz = async (req, res) => {
    let success = false;
    let user = req.user;

    try {
        let quizzes = await Quiz.find({ user: user.id }, "name impressions createdOn type quizID");
        if (!quizzes) {
            return res.json({ error: "No Quizzes Found!" });
        }
        quizzes = quizzes.map((quiz) => {
            return {
                name: quiz.name,
                impressions: convertToK(quiz.impressions),
                createdOn: quiz.createdOn,
                type: quiz.type,
                quizID: quiz.quizID,
            };
        });
        success = true;
        return res.json({ success, quizzes });
    }
    catch (error) {
        console.log(error);
        return res.json({ error: "Something Went Wrong!" });
    }
}

const getQuestions = async (req, res) => {
    let success = false;
    let user = req.user;
    let { quizid } = req.body;

    try {
        let quiz = await Quiz.findOne({ user: user.id, quizID: quizid }, "name impressions createdOn type quizID");
        if (!quiz) {
            return res.json({ error: "Quiz Not Found!" });
        }
        let questions = await Question.find({ quiz: quizid }, "timer correctAnswer imageOptions question optionType type options attempts correct incorrect optedOption1 optedOption2 optedOption3 optedOption4");

        success = true;
        return res.json({ success, questions, quiz });
    }
    catch (error) {
        console.log(error);
        return res.json({ error: "Something Went Wrong!" });
    }
}

const updateQuestion = async (req, res) => {
    let { questionID } = req.params;
    let {
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
    } = req.body;
  
    try {
      let questionToUpdate = await Question.findById(questionID);
      if (!questionToUpdate) {
        return res.json({ error: "Question Not Found!" });
      }
  
      questionToUpdate.question = question;
      questionToUpdate.options[0] = option1;
      questionToUpdate.options[1] = option2;
      questionToUpdate.options[2] = option3;
      questionToUpdate.options[3] = option4;
      questionToUpdate.imageOptions[0] = option1img;
      questionToUpdate.imageOptions[1] = option2img;
      questionToUpdate.imageOptions[2] = option3img;
      questionToUpdate.imageOptions[3] = option4img;
      questionToUpdate.timer = timer;
      questionToUpdate.correctAnswer = correctAnswer;
  
      await questionToUpdate.save();
  
      return res.json({ success: true, message: "Question updated successfully!" });
    } catch (error) {
      console.log(error);
      return res.json({ error: "Something Went Wrong!" });
    }
  };

module.exports = {getAllQuiz, getQuestions, updateQuestion};