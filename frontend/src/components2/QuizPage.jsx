import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import backendClient from "../../services/api.js";
import Confetti from "react-confetti";
import "./QuizPage.css";

function QuizPage() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [clickedOptions, setClickedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [slideDirection, setSlideDirection] = useState("");

  const [showConfetti, setShowConfetti] = useState(false);

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
        [questionIndex]: { selectedAnswer, isCorrect },
      }));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setSlideDirection("slide-right");
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }, 300);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setSlideDirection("slide-left");
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      }, 300);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  if (!quiz) return <div>Loading...</div>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="container mt-4 quiz-container">
      {showConfetti && <Confetti />}
      <h2>{quiz.quizName}</h2>
      <div className={`question-card ${slideDirection}`}>
        <h4>{currentQuestion.question}</h4>
        <ul className="options-list">
          {currentQuestion.options.map((option, idx) => {
            const isSelected =
              clickedOptions[currentQuestionIndex]?.selectedAnswer === option;
            const isCorrect = clickedOptions[currentQuestionIndex]?.isCorrect;

            const hoverable = !clickedOptions[currentQuestionIndex]
              ? "hoverable"
              : "";

            return (
              <li
                key={idx}
                onClick={() =>
                  handleAnswerClick(
                    currentQuestion.answer,
                    option,
                    currentQuestionIndex
                  )
                }
                className={`list-group-item p-2 ${
                  isSelected
                    ? isCorrect
                      ? "selected-correct"
                      : "selected-incorrect"
                    : "unselected"
                } ${hoverable}`}
              >
                {option}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="navigation-buttons mt-4">
        <button
          onClick={handlePreviousQuestion}
          className="btn btn-secondary"
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>

        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <button onClick={handleNextQuestion} className="btn btn-primary ml-2">
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} className="btn btn-success ml-2">
            Submit
          </button>
        )}
      </div>

      {showResults && (
        <div className="text-center mt-4">
          <h3 className="score-display">
            Score: {score} / {quiz.questions.length}
          </h3>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
