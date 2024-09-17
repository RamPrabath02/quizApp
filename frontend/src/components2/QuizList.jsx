// QuizList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await axios.get("/quiz");
      setQuizzes(response.data);
    };
    fetchQuizzes();
  }, []);

  const startQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Available Quizzes</h2>
      <div className="row">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="col-md-4 mt-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{quiz.quizName}</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => startQuiz(quiz.id)}
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
