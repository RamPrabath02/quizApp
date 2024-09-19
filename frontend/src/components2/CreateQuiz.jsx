import { useEffect, useState } from "react";
import backendClient from "../../services/api.js";
import QuizList from "./QuizList.jsx";

const CreateQuiz = ({ fetchQuizzes }) => {
  const [createButtonVisible, setCreateButtonVisible] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
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

  const undoLastQuestion = () => {
    const updatedQuestions = [...questions];
    updatedQuestions.pop();
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizData = {
      quizName,
      questions,
    };

    try {
      await backendClient.post("/createQuiz", quizData);
      const newQuizzes = await fetchQuizzes();
      setQuizzes(newQuizzes);
      setCreateButtonVisible(false);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <>
      <h2 className="mt-5">Available Quizzes</h2>
      <QuizList fetchQuizzes={fetchQuizzes} />

      {!createButtonVisible && (
        <button
          className="btn btn-primary mt-4"
          onClick={() => setCreateButtonVisible(true)}
        >
          Create New Quiz
        </button>
      )}

      {createButtonVisible && (
        <div className="container mt-5">
          <h2>Create New Quiz</h2>
          <div className="card">
            <form onSubmit={handleSubmit} className="mt-3 p-3">
              <div>
                <label className="form-label">Quiz Name:</label>
                <input
                  type="text"
                  value={quizName}
                  className="form-control"
                  onChange={(e) => setQuizName(e.target.value)}
                  required
                />
              </div>

              {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="mt-3">
                  <label className="form-label">
                    Question {questionIndex + 1}:
                  </label>
                  <input
                    type="text"
                    value={question.question}
                    className="form-control"
                    onChange={(e) =>
                      handleQuestionChange(
                        questionIndex,
                        "question",
                        e.target.value
                      )
                    }
                    required
                  />

                  <div className="mt-2">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <label className="form-label">
                          Option {optionIndex + 1}:
                        </label>
                        <input
                          type="text"
                          value={option}
                          className="form-control"
                          onChange={(e) =>
                            handleOptionChange(
                              questionIndex,
                              optionIndex,
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-2">
                    <label className="form-label">Correct Answer:</label>
                    <input
                      type="text"
                      value={question.answer}
                      className="form-control"
                      onChange={(e) =>
                        handleQuestionChange(
                          questionIndex,
                          "answer",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-secondary mt-3"
                onClick={addQuestion}
              >
                Add Another Question
              </button>

              <button
                type="button"
                className="btn btn-danger mt-3"
                onClick={undoLastQuestion}
                disabled={questions.length === 1}
              >
                Undo Last Question
              </button>

              <button type="submit" className="btn btn-success mt-3">
                Create Quiz
              </button>
            </form>

            <button
              className="btn btn-danger mt-3"
              onClick={() => setCreateButtonVisible(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateQuiz;
