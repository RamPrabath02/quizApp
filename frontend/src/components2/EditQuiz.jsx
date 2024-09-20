import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import backendClient from "../../services/api";

const EditQuiz = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState({
    quizName: "",
    questions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };
  useEffect(() => {
    fetchQuizDetails();
  }, [quizId]);

  const fetchQuizDetails = async () => {
    try {
      const response = await backendClient.get(`/quiz/${quizId}`);
      setQuizData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching quiz details:", err);
      setError("Error fetching quiz details.");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await backendClient.patch(`/updateQuiz/${quizId}`, quizData);

      document.getElementById("go-to-quiz-list").click();
    } catch (error) {
      console.error("Error updating quiz:", error);
      setError("Error updating quiz.");
    }
  };

  if (loading) {
    return <p>Loading quiz details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Edit Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Quiz Name</label>
          <input
            type="text"
            className="form-control"
            name="quizName"
            value={quizData.quizName}
            onChange={handleInputChange}
            required
          />
        </div>

        {quizData.questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <div className="form-group">
              <label>Question {questionIndex + 1}</label>
              <input
                type="text"
                className="form-control"
                name={`question_${questionIndex}`}
                value={question.question || ""}
                onChange={(e) => {
                  const newQuestions = [...quizData.questions];
                  newQuestions[questionIndex].question = e.target.value;
                  setQuizData((prevData) => ({
                    ...prevData,
                    questions: newQuestions,
                  }));
                }}
                required
              />
            </div>
            {question.options.map((option, optionIndex) => (
              <div className="form-group" key={optionIndex}>
                <label>Option {optionIndex + 1}</label>
                <input
                  type="text"
                  className="form-control"
                  name={`option_${questionIndex}_${optionIndex}`}
                  value={option || ""}
                  onChange={(e) => {
                    const newQuestions = [...quizData.questions];
                    newQuestions[questionIndex].options[optionIndex] =
                      e.target.value;
                    setQuizData((prevData) => ({
                      ...prevData,
                      questions: newQuestions,
                    }));
                  }}
                  required
                />
              </div>
            ))}
            {/* <div className="form-group">
              <label>Answer</label>
              <input
                type="text"
                className="form-control"
                name={`answer_${questionIndex}`}
                value={question.answer || ""}
                onChange={(e) => {
                  const newQuestions = [...quizData.questions];
                  newQuestions[questionIndex].answer = e.target.value;
                  setQuizData((prevData) => ({
                    ...prevData,
                    questions: newQuestions,
                  }));
                }}
                required
              />
            </div> */}
            <div className="mt-2">
              <label className="form-label text-success">Correct Answer:</label>
              <select
                value={question.answer}
                className="form-control"
                onChange={(e) =>
                  handleQuestionChange(questionIndex, "answer", e.target.value)
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
            </div>
            <hr />
          </div>
        ))}

        <button type="submit" className="btn btn-primary mt-3">
          Update Quiz
        </button>
      </form>

      <Link
        id="go-to-quiz-list"
        to="/createQuiz"
        style={{ display: "none" }}
      ></Link>
    </div>
  );
};

export default EditQuiz;
