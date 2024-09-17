// function QuizPage() {
//   const { quizId } = useParams(); // Get quizId from URL
//   const [quiz, setQuiz] = useState(null);
//   const [score, setScore] = useState(0);
//   const [clickedOptions, setClickedOptions] = useState({});

//   useEffect(() => {
//     // Fetch selected quiz by ID
//     fetch(`http://localhost:8000/quiz/${quizId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setQuiz(data); // Set quiz data
//         console.log(data);
//       })
//       .catch((err) => {
//         console.log("Fetch error:", err.message);
//       });
//   }, [quizId]);

//   const handleAnswerClick = (correctAnswer, selectedAnswer, questionIndex) => {
//     if (!clickedOptions[questionIndex]) {
//       const isCorrect = correctAnswer === selectedAnswer;
//       if (isCorrect) {
//         setScore((prevScore) => prevScore + 1);
//       }
//       setClickedOptions((prev) => ({
//         ...prev,
//         [questionIndex]: isCorrect ? "correct" : "incorrect",
//       }));
//     }
//   };

//   if (!quiz) {
//     return <div>Loading...</div>; // Show loading message while data is fetched
//   }

//   return (
//     <div className="container mt-4">
//       <h2>{quiz.quizName}</h2>
//       <div className="quiz-container">
//         {quiz.questions.map((item, index) => (
//           <div key={index} className="mb-4">
//             <h4>{item.question}</h4>
//             <ul className="list-unstyled">
//               {item.options.map((option, idx) => (
//                 <li
//                   key={idx}
//                   onClick={() => handleAnswerClick(item.answer, option, index)}
//                   className={`list-group-item ${
//                     clickedOptions[index] === "correct"
//                       ? "bg-success text-light"
//                       : clickedOptions[index] === "incorrect"
//                       ? "bg-danger text-light"
//                       : "bg-light"
//                   }`}
//                 >
//                   {option}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//         <div className="text-center mt-4">
//           <h3 className="score-display">
//             Score: {score} / {quiz.questions.length}
//           </h3>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default QuizPage;
// QuizPage.jsx

import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import backendClient from "../../services/api.js";

const QuizPage = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [clickedOptions, setClickedOptions] = useState({});

  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await backendClient.get(`/quiz/${quizId}`);
      setQuestions(response.data.questions);
    };
    fetchQuiz();
  }, [quizId]);

  const handleAnswerClick = (correctAnswer, selectedOption, index) => {
    if (!clickedOptions[index]) {
      setClickedOptions({
        ...clickedOptions,
        [index]: correctAnswer === selectedOption ? "correct" : "incorrect",
      });
      if (correctAnswer === selectedOption) {
        setScore(score + 1);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Quiz Questions</h2>
      <div className="quiz-container">
        {questions.map((item, index) => (
          <div key={index} className="mb-4">
            <h3>{item.question}</h3>
            <ul className="list-group">
              {item.options.map((option, idx) => (
                <li
                  key={idx}
                  onClick={() => handleAnswerClick(item.answer, option, index)}
                  className={`list-group-item ${
                    clickedOptions[index] === "correct"
                      ? "bg-success text-white"
                      : clickedOptions[index] === "incorrect"
                      ? "bg-danger text-white"
                      : ""
                  }`}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="text-center mt-4">
          <h4>
            Score: {score} / {questions.length}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
