const express = require("express");
const cors = require("cors");
const connectDB = require("./database");
const routes = require("./routes/index");
const path = require("path");

connectDB();


const app = express();
let port = process.env.PORT || 9000;


app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
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
