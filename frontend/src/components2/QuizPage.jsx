import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import backendClient from "../../services/api.js";

function QuizPage() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [score, setScore] = useState(0);
  const [clickedOptions, setClickedOptions] = useState({});

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await backendClient.get(`/quiz/${quizId}`);
        setQuiz(response.data);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };
    fetchQuizData();
  }, [quizId]);

  const handleAnswerClick = (correctAnswer, selectedAnswer, questionIndex) => {
    if (!clickedOptions[questionIndex]) {
      const isCorrect = correctAnswer === selectedAnswer;
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
      setClickedOptions((prev) => ({
        ...prev,
        [questionIndex]: isCorrect ? "correct" : "incorrect",
      }));
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{quiz.quizName}</h2>
      {quiz.questions.map((item, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <h4>{item.question}</h4>
            <ul className="list-unstyled">
              {item.options.map((option, idx) => (
                <li
                  key={idx}
                  onClick={() => handleAnswerClick(item.answer, option, index)}
                  className={`list-group-item ${
                    clickedOptions[index] === "correct"
                      ? "bg-success text-light"
                      : clickedOptions[index] === "incorrect"
                      ? "bg-danger text-light"
                      : "bg-light"
                  }`}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <div className="text-center mt-4">
        <h3 className="score-display">
          Score: {score} / {quiz.questions.length}
        </h3>
      </div>
    </div>
  );
}

export default QuizPage;
