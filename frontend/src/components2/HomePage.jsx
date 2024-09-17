import React from "react";
import { Link } from "react-router-dom";

const HomePage = ({ quizzes }) => {
  return (
    <div className="text-center">
      <h1 className="mt-4">Welcome to the Quiz App</h1>
      <div className="mt-4">
        <Link to="/createQuiz" className="btn btn-primary">
          Create New Quiz
        </Link>
        <Link to="/" className="btn btn-success ml-3">
          Start a Quiz
        </Link>
      </div>

      <h2 className="mt-5">Available Quizzes</h2>
      <div className="row mt-4">
        {quizzes.map((quiz) => (
          <div className="col-md-4 mb-3" key={quiz.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{quiz.quizName}</h5>
                <Link to={`/quiz/${quiz.id}`} className="btn btn-primary">
                  Start Quiz
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
