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
        const response = await axios.get(
          `http://localhost:8000/quiz/${quizId}`
        );
        setQuiz(response.data);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index][field] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleUpdate = async () => {
    try {
      for (const question of quiz.questions) {
        await axios.patch(
          `http://localhost:8000/updateQuestion/${question.id}`,
          question
        );
      }
      setEditMode(false);
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div>
      <h2>{quiz.quizName}</h2>
      {quiz.questions.map((question, index) => (
        <div key={index}>
          {editMode ? (
            <input
              type="text"
              value={question.question}
              onChange={(e) =>
                handleQuestionChange(index, "question", e.target.value)
              }
            />
          ) : (
            <p>{question.question}</p>
          )}
          <ul>
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex}>{option}</li>
            ))}
          </ul>
          <p>Answer: {question.answer}</p>
        </div>
      ))}
      <button onClick={handleEdit}>{editMode ? "Cancel" : "Edit Quiz"}</button>
      {editMode && <button onClick={handleUpdate}>Save Changes</button>}
    </div>
  );
};

export default QuizDetails;
