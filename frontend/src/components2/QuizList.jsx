import React from "react";
import { Link } from "react-router-dom";

const QuizList = ({ quizzes, onDelete }) => {
  return (
    <div className="container mt-4">
      <h2>All Quizzes</h2>
      <div className="row">
        {quizzes.map((quiz) => (
          <div className="col-md-4 mb-3" key={quiz.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{quiz.quizName}</h5>
                <Link
                  to={`/quizDetails/${quiz.id}`}
                  className="btn btn-info mr-2"
                >
                  View
                </Link>
                <button
                  onClick={() => onDelete(quiz.id)}
                  className="btn btn-danger"
                >
                  Delete
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
