const express = require("express");
const cors = require("cors");
const connectDB = require("./database");
const routes = require("./routes/index");
const path = require("path");

connectDB();


const app = express();
let port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes());

app.listen(port, () => {
  console.log("Server started at port: " + port);
});
