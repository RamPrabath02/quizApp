import { useState } from "react";
import backendClient from "../../services/api.js";
import QuizList from "./QuizList.jsx";

const CreateQuiz = ({ fetchQuizzes }) => {
  const [createButtonVisible, setCreateButtonVisible] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);
  const [isSubmitReload, setSubmitReload] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!quizName.trim()) {
      newErrors.quizName = "Quiz name is required.";
    }

    questions.forEach((question, index) => {
      if (!question.question.trim()) {
        newErrors[`question_${index}`] = `Question ${index + 1} is required.`;
      }

      const optionValues = question.options.map((opt) => opt.trim());
      const uniqueOptions = new Set(optionValues);

      question.options.forEach((option, optionIndex) => {
        if (!option.trim()) {
          newErrors[`option_${index}_${optionIndex}`] = `Option ${
            optionIndex + 1
          } is required for Question ${index + 1}.`;
        }
      });

      if (uniqueOptions.size !== optionValues.length) {
        newErrors[`duplicate_options_${index}`] = `Options must be unique.`;
      }

      if (!question.answer.trim()) {
        newErrors[
          `answer_${index}`
        ] = `Correct answer is required for Question.`;
      } else if (!optionValues.includes(question.answer.trim())) {
        newErrors[
          `answer_${index}`
        ] = `Correct answer must be one of the provided options for Question ${
          index + 1
        }.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    if (questions.length > 1) {
      const updatedQuestions = [...questions];
      updatedQuestions.pop();
      setQuestions(updatedQuestions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const quizData = {
      quizName: quizName.trim(),
      questions: questions.map((q) => ({
        ...q,
        question: q.question.trim(),
        options: q.options.map((opt) => opt.trim()),
        answer: q.answer.trim(),
      })),
    };

    try {
      await backendClient.post("/createQuiz", quizData);
      await fetchQuizzes();
      setCreateButtonVisible(false);
      setQuizName("");
      setQuestions([{ question: "", options: ["", "", "", ""], answer: "" }]);
      alert("Quiz created successfully");
      setSubmitReload(!isSubmitReload);
    } catch (error) {
      alert(
        error.response?.data?.error ||
          "An error occurred while creating the quiz"
      );
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <>
      <h2 className="mt-5">Available Quizzes</h2>
      <QuizList key={isSubmitReload} />

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
                <label className="form-label text-dark">Quiz Name:</label>
                <input
                  type="text"
                  value={quizName}
                  className="form-control"
                  onChange={(e) => setQuizName(e.target.value)}
                  required
                />
                {errors.quizName && (
                  <small className="text-danger">{errors.quizName}</small>
                )}
              </div>

              {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="mt-3">
                  <label className="form-label text-primary">
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
                  {errors[`question_${questionIndex}`] && (
                    <small className="text-danger">
                      {errors[`question_${questionIndex}`]}
                    </small>
                  )}

                  <div className="mt-2">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <label className="form-label text-secondary">
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
                        {errors[`option_${questionIndex}_${optionIndex}`] && (
                          <small className="text-danger">
                            {errors[`option_${questionIndex}_${optionIndex}`]}
                          </small>
                        )}
                      </div>
                    ))}
                    {errors[`duplicate_options_${questionIndex}`] && (
                      <small className="text-danger">
                        {errors[`duplicate_options_${questionIndex}`]}
                      </small>
                    )}
                  </div>

                  <div className="mt-2">
                    <label className="form-label text-success">
                      Correct Answer:
                    </label>
                    <select
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
                    >
                      <option value="" disabled>
                        Select the correct answer
                      </option>
                      {question.options.map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors[`answer_${questionIndex}`] && (
                      <small className="text-danger">
                        {errors[`answer_${questionIndex}`]}
                      </small>
                    )}
                  </div>
                  <hr />
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
