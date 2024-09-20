import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import backendClient from "../../services/api.js";
import ProgressBar from "./ProgressBar.jsx";

function QuizPage() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [score, setScore] = useState(0);
  const [clickedOptions, setClickedOptions] = useState({});
  const [showResults, setShowResults] = useState(false);

  const [progress, setProgress] = useState(0);
  const checkAnswer = (selectedOption, correctAnswer) => {
    if (selectedOption === correctAnswer) {
      setProgress((prevProgress) => Math.min(prevProgress + 20, 100));
    } else {
      setProgress((prevProgress) => Math.max(prevProgress - 20, 0));
    }
  };
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

      checkAnswer(selectedAnswer, correctAnswer);
    }
  };
  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="container mt-4 p-2 ">
      <h2>{quiz.quizName}</h2>
      {quiz.questions.map((item, index) => (
        <div key={index} className="card mb-3 p-2">
          <div className="card-body p-2">
            <h4>{item.question}</h4>
            <ul className="p-2">
              {item.options.map((option, idx) => (
                <>
                  <li
                    key={idx}
                    onClick={() =>
                      handleAnswerClick(item.answer, option, index)
                    }
                    className={`list-group-item p-2 ${
                      clickedOptions[index] === "correct"
                        ? "bg-success text-light p-2 rounded-3"
                        : clickedOptions[index] === "incorrect"
                        ? "bg-danger text-light p-2 rounded-3"
                        : "bg-light rounded-3"
                    }`}
                  >
                    {option}
                  </li>
                  <br></br>
                </>
              ))}
            </ul>
            <ProgressBar progress={progress} />
          </div>
        </div>
      ))}
      <button
        onClick={() => setShowResults(true)}
        className="btn btn-primary mt-3"
      >
        Submit
      </button>

      {/* Show results only after submission */}
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
