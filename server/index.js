const express = require("express");
const cors = require("cors");
const connectDB = require("./database");
const routes = require("./routes/index");
const path = require("path");

connectDB();


const app = express();
let port = process.env.PORT || 9000;

app.use(cors({origin: "https://quiz-builder-mern.vercel.app", credentials: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes());

app.get("/", (req, res) => {
  return res.send("<h1>Quizzie Backend Working </h1>");
})

app.listen(port, () => {
  console.log("Server started at port: " + port);
});
