const express = require("express");
const cors = require("cors");
const connectDB = require("./database");
const routes = require("./routes/index");

connectDB();

const app = express();
let port = process.env.PORT || 9000;


const corsOptions = {
  origin: 'https://quiz-builder-front.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
};


app.use(cors(corsOptions));


app.options('*', cors(corsOptions));

app.use(express.json());
app.use(routes());

app.listen(port, () => {
  console.log("Server started at port: " + port);
});
