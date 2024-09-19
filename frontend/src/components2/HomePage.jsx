import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import backendClient from "../../services/api.js";

const HomePage = ({ quizzes, setQuizzes }) => {
  const deleteQuiz = async (quizId) => {
    try {
      await backendClient.delete(`/deleteQuiz/${quizId}`);
      alert("Deleted successfully");
      fetchQuizzes();
    } catch (err) {
      alert("Error in deleting quiz");
      console.log(err);
    }
  };
  const fetchQuizzes = async () => {
    try {
      const response = await backendClient.get("/quiz");
      console.log(response.data);
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  return (
    <div className="text-center">
      <h1 className="mt-4">Welcome to the Quiz App</h1>
      <div className="mt-4">
        <Link to="/createQuiz" className="btn btn-success">
          Admin Quiz Data Management
        </Link>
      </div>

      <h2 className="mt-5">Available Quizzes</h2>
      <div className="row mt-4">
        {quizzes.map((quiz) => (
          <div className="col-md-4 mb-3" key={quiz.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{quiz.quizName}</h5>
                <>
                  <Link to={`/quiz/${quiz.id}`} className="btn btn-primary">
                    Start Quiz
                  </Link>
                </>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
