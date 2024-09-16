import React from "react";
import { Link } from "react-router-dom";

const QuizList = ({ quizzes, onDelete }) => {
  return (
    <div>
      <h2>All Quizzes</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <span>{quiz.quizName}</span>
            <Link to={`/quiz/${quiz.id}`}>
              <button>View</button>
            </Link>
            <button onClick={() => onDelete(quiz.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
