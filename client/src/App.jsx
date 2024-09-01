import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import Quiz from "./pages/Quiz/Quiz.jsx";

import {GlobalState} from "./context/GlobalContext";
import {AnalyticsState} from "./context/AnalyticsContext";
import { QuizState } from "./context/QuizContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
    <GlobalState>
    <AnalyticsState>
    <QuizState>
    <ToastContainer autoClose={1000} />
      <Router>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/quiz/:id" element={<Quiz />} />
          </Routes>
        </div>
      </Router>
      </QuizState>
      </AnalyticsState>
      </GlobalState>
    </>
  );
}

export default App;
