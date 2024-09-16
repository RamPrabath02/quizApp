import { useState, useEffect } from "react";
import quizData from "./assets/quizData.json";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateQuiz from "./components/CreateQuiz";
import DataBase from "./db/database";
import DataBase2 from "./db/database2";

function App() {
  const [questions, setQuestions] = useState([]);
  const [startCondition, setStartCondition] = useState(false);
  const [score, setScore] = useState(0);
  const [clickedOptions, setClickedOptions] = useState({});
  const [makeQuiz, setMakeQuiz] = useState(false);
  const [quiz, setQuiz] = useState([]);

  const makeQuizValue = () => {
    setMakeQuiz(true);
  };
  useEffect(() => {
    fetch("http://localhost:8000/quiz")
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data);
        console.log(data);
      })
      .catch((err) => {
        console.log("Fetch error:", err.message);
      });
  }, []);

  // useEffect(() => {
  //   setQuestions(quizData);
  // }, []);
  // http://localhost:8000/quiz

  const handleAnswerClick = (correctAnswer, selectedAnswer, questionIndex) => {
    if (!clickedOptions[questionIndex]) {
      const isCorrect = correctAnswer === selectedAnswer;
      if (isCorrect) {
        console.log("Correct Answer:", selectedAnswer);
        setScore((prevScore) => prevScore + 1);
      } else {
        console.log("Incorrect Answer:", selectedAnswer);
      }

      setClickedOptions((prev) => ({
        ...prev,
        [questionIndex]: isCorrect ? "correct" : "incorrect", // Update to track correct/incorrect
      }));
    }
  };

  const startQuiz = () => {
    setStartCondition(true);
    setClickedOptions({});
    setScore(0);
  };

  return (
    <>
      <div className="container text-center mt-4">
        <h1 className="mb-4">Quiz App</h1>
      </div>
      <div className="text-center">
        <p>You can Create your own quiz from here.</p>
        <p>Click on start button to start the quiz.</p>
        <button className="btn btn-primary" onClick={startQuiz}>
          Start
        </button>
        {!startCondition && (
          <>
            <p>If you want to make your own quiz.</p>
            <button className="btn btn-primary" onClick={makeQuizValue}>
              Make Quiz
            </button>
            {makeQuiz ? (
              <>
                {/* <CreateQuiz /> */}
                <p>ADMIN DATABASE</p>
                {/* <DataBase /> */}
                <DataBase2 />
              </>
            ) : null}
          </>
        )}
      </div>
      <div className="container">
        {startCondition ? (
          <>
            <div className="text-center">Welcome to the Quiz</div>
            <div className="quiz-container">
              {questions.map((item, index) => (
                <div key={index} className="mb-4">
                  <h2>{item.question}</h2>
                  <ul className="list-unstyled">
                    {item.options.map((option, idx) => (
                      <li
                        key={idx}
                        onClick={() =>
                          handleAnswerClick(item.answer, option, index)
                        }
                        className={`list-group-item ${
                          clickedOptions[index] === "correct"
                            ? "bg-success text-light"
                            : clickedOptions[index] === "incorrect"
                            ? "bg-danger text-light"
                            : "bg-light"
                        }`}
                        style={{
                          cursor: clickedOptions[index]
                            ? "not-allowed"
                            : "pointer",
                          opacity: clickedOptions[index] ? 0.6 : 1,
                          backgroundColor:
                            clickedOptions[index] === "correct"
                              ? "#000000"
                              : clickedOptions[index] === "incorrect"
                              ? "#ff0000"
                              : "#ffffff",
                        }}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="text-center mt-4">
                <h3 className="score-display">
                  Score: {score} / {questions.length}
                </h3>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default App;
