import { useState } from "react";
import backendClient from "../../services/api.js";

const CreateQuiz = ({ fetchQuizzes }) => {
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], answer: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizData = {
      quizName,
      questions,
    };

    try {
      await backendClient.post("/createQuiz", quizData);
      fetchQuizzes(); // Refresh the quiz list after creation
      window.location.href = "/"
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <div>
      <h2>Create New Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Quiz Name:</label>
          <input
            type="text"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
          />
        </div>
        {questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <label>Question {questionIndex + 1}:</label>
            <input
              type="text"
              value={question.question}
              onChange={(e) =>
                handleQuestionChange(questionIndex, "question", e.target.value)
              }
            />
            <div>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <label>Option {optionIndex + 1}:</label>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(
                        questionIndex,
                        optionIndex,
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
            </div>
            <div>
              <label>Correct Answer:</label>
              <input
                type="text"
                value={question.answer}
                onChange={(e) =>
                  handleQuestionChange(questionIndex, "answer", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>
          Add Another Question
        </button>
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
};

export default CreateQuiz;
