// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import backendClient from "../../services/api.js";

// const QuizDetails = () => {
//   const { quizId } = useParams();
//   const [quiz, setQuiz] = useState(null);
//   const [editMode, setEditMode] = useState(false);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const response = await backendClient.get(
//           `/quiz/${quizId}`
//         );
//         setQuiz(response.data);
//       } catch (error) {
//         console.error("Error fetching quiz details:", error);
//       }
//     };
//     fetchQuiz();
//   }, [quizId]);

//   const handleEdit = () => {
//     setEditMode(!editMode);
//   };

//   const handleQuestionChange = (index, field, value) => {
//     const updatedQuestions = [...quiz.questions];
//     updatedQuestions[index][field] = value;
//     setQuiz({ ...quiz, questions: updatedQuestions });
//   };

//   const handleUpdate = async () => {
//     try {
//       for (const question of quiz.questions) {
//         await axios.patch(
//           `http://localhost:8000/updateQuestion/${question.id}`,
//           question
//         );
//       }
//       setEditMode(false);
//     } catch (error) {
//       console.error("Error updating quiz:", error);
//     }
//   };

//   if (!quiz) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>{quiz.quizName}</h2>
//       {quiz.questions.map((question, index) => (
//         <div key={index}>
//           {editMode ? (
//             <input
//               type="text"
//               value={question.question}
//               onChange={(e) =>
//                 handleQuestionChange(index, "question", e.target.value)
//               }
//             />
//           ) : (
//             <p>{question.question}</p>
//           )}
//           <ul>
//             {question.options.map((option, optionIndex) => (
//               <li key={optionIndex}>{option}</li>
//             ))}
//           </ul>
//           <p>Answer: {question.answer}</p>
//         </div>
//       ))}
//       <button onClick={handleEdit}>{editMode ? "Cancel" : "Edit Quiz"}</button>
//       {editMode && <button onClick={handleUpdate}>Save Changes</button>}
//     </div>
//   );
// };

// export default QuizDetails;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QuizDetails = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/quiz/${quizId}`);
        setQuiz(response.data);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index][field] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleUpdate = async () => {
    try {
      await Promise.all(
        quiz.questions.map((question) =>
          axios.patch(`/updateQuestion/${question.id}`, question)
        )
      );
      setEditMode(false);
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>{quiz.quizName}</h2>
      {quiz.questions.map((question, index) => (
        <div key={index} className="form-group">
          {editMode ? (
            <>
              <input
                type="text"
                className="form-control"
                value={question.question}
                onChange={(e) =>
                  handleQuestionChange(index, "question", e.target.value)
                }
              />
              {question.options.map((option, optIndex) => (
                <input
                  type="text"
                  className="form-control mt-2"
                  value={option}
                  key={optIndex}
                  onChange={(e) =>
                    handleQuestionChange(
                      index,
                      `options[${optIndex}]`,
                      e.target.value
                    )
                  }
                />
              ))}
              <input
                type="text"
                className="form-control mt-2"
                value={question.answer}
                onChange={(e) =>
                  handleQuestionChange(index, "answer", e.target.value)
                }
              />
            </>
          ) : (
            <>
              <p>{question.question}</p>
              <ul>
                {question.options.map((option, optIndex) => (
                  <li key={optIndex}>{option}</li>
                ))}
              </ul>
              <p>Answer: {question.answer}</p>
            </>
          )}
        </div>
      ))}
      <button
        onClick={() => setEditMode(!editMode)}
        className="btn btn-warning mt-3"
      >
        {editMode ? "Cancel" : "Edit Quiz"}
      </button>
      {editMode && (
        <button onClick={handleUpdate} className="btn btn-success mt-3 ml-2">
          Save Changes
        </button>
      )}
    </div>
  );
};

export default QuizDetails;
