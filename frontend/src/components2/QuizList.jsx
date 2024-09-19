import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backendClient from "../../services/api";

const QuizList = ({ onDelete }) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await backendClient.get("/quiz");
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      await backendClient.delete(`/deleteQuiz/${quizId}`);
      if (onDelete) {
        onDelete(quizId);
      }
      setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Quiz not found or has already been deleted.");
      } else {
        console.error("Error deleting quiz:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>All Quizzes</h2>
      <div className="row">
        {quizzes.length === 0 ? (
          <p>No quizzes available.</p>
        ) : (
          quizzes.map((quiz) => (
            <div className="col-md-4 mb-3" key={quiz.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{quiz.quizName}</h5>

                  <Link
                    to={`/updateQuiz/${quiz.id}`}
                    className="btn btn-info mr-2"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDeleteQuiz(quiz.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuizList;
