import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "../services/api";
import backgroundImage from "C:/Users/Ram Prabath/Downloads/quiz_background.jpg";

import CreateQuiz from "./components2/CreateQuiz";

import QuizPage from "./components2/QuizPage";
import HomePage from "./components2/HomePage";
import Login from "./components2/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import EditQuiz from "./components2/EditQuiz";

function App2() {
  const [quizzes, setQuizzes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  console.log(isAdmin);
  useEffect(() => {
    fetchQuizzes();
    console.log("fetcehed quiz: " + fetchQuizzes.value);
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("/quiz");
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      await axios.delete(`/deleteQuiz/${quizId}`);
      fetchQuizzes();
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <Router>
      <div
        className="container"
        // style={{
        //   backgroundImage: `url(${backgroundImage})`,
        //   backgroundSize: "cover", // Adjust size (cover/contain)
        //   backgroundPosition: "center", // Center the image
        //   height: "100vh", // Full viewport height
        //   width: "100%", // Full width
        // }}
      >
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <Link className="navbar-brand" to="/">
            Quiz App
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              {isAdmin && (
                <li className="nav-item">
                  <Link className="nav-link" to="/createQuiz">
                    Admin Quiz Management
                  </Link>
                </li>
              )}
              {!isAdmin && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Admin Quiz Management
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                quizzes={quizzes}
                setQuizzes={setQuizzes}
                onDelete={handleDeleteQuiz}
              />
            }
          />

          <Route path="/quiz/:quizId" element={<QuizPage />} />
          <Route
            path="/createQuiz"
            element={
              isAdmin ? (
                <CreateQuiz fetchQuizzes={fetchQuizzes} />
              ) : (
                <Login setIsAdmin={setIsAdmin} />
              )
            }
          />
          {/* <Route path="/quizDetails/:quizId" element={<QuizDetails />} /> */}
          <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />

          <Route path="/updateQuestion/:quizId" component={<EditQuiz />} />
          <Route path="/updateQuiz/:quizId" element={<EditQuiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App2;
