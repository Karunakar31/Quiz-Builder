const {getAllQuiz, getQuestions} = require("../controllers/analyticsController");
const {updateQuestion} = require("../controllers/analyticsController");
const fetchuser = require("../middleware/fetchuser");

const analytics = (router) => {
  router.route("/api/analytics/allquiz").get(fetchuser, (req, res) => getAllQuiz(req, res));
    router.route("/api/analytics/getquestions").post(fetchuser, (req, res) => getQuestions(req, res));
    router.route("/api/analytics/:questionID").patch( (req, res) => updateQuestion(req, res));
};

module.exports = analytics;