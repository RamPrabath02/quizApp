// Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1>Welcome to the Quiz App</h1>
      <p>Click below to start the quiz or create a new quiz.</p>
      <div className="mt-4">
        <button
          className="btn btn-primary me-2"
          onClick={() => navigate("/quizlist")}
        >
          Start Quiz
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/createquiz")}
        >
          Create New Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;
