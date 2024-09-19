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

  // return (
  //   <div className="container mt-4">
  //     <h2>Edit Quiz</h2>
  //     <form onSubmit={handleSubmit}>
  //       <div className="form-group">
  //         <label>Quiz Name</label>
  //         <input
  //           type="text"
  //           className="form-control"
  //           name="quizName"
  //           value={quizData.quizName}
  //           onChange={handleInputChange}
  //           required
  //         />
  //       </div>

  //       <div className="form-group" key={quizData.questions[0].id}>
  //         <label>Question 1</label>
  //         <input
  //           type="text"
  //           className="form-control"
  //           name={`question_${0}`}
  //           value={quizData.questions[0].question || ""}
  //           onChange={(e) => {
  //             const newQuestions = [...quizData.questions];
  //             newQuestions[0].question = e.target.value;
  //             setQuizData((prevData) => ({
  //               ...prevData,
  //               questions: newQuestions,
  //             }));
  //           }}
  //         />
  //       </div>

  //       <div className="form-group">
  //         <label>Option 1</label>
  //         <input
  //           type="text"
  //           className="form-control"
  //           name="options[0]"
  //           value={quizData.questions[0].options[0] || ""}
  //           onChange={(e) => {
  //             const newQuestions = [...quizData.questions];
  //             newQuestions[0].options[0] = e.target.value;
  //             setQuizData((prevData) => ({
  //               ...prevData,
  //               questions: newQuestions,
  //             }));
  //           }}
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label>Option 2</label>
  //         <input
  //           type="text"
  //           className="form-control"
  //           name="options[1]"
  //           value={quizData.questions[0].options[1] || ""}
  //           onChange={(e) => {
  //             const newQuestions = [...quizData.questions];
  //             newQuestions[0].options[1] = e.target.value;
  //             setQuizData((prevData) => ({
  //               ...prevData,
  //               questions: newQuestions,
  //             }));
  //           }}
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label>option 3</label>
  //         <input
  //           type="text"
  //           className="form-control"
  //           name="options[2]"
  //           value={quizData.questions[0].options[2] || ""}
  //           onChange={(e) => {
  //             const newQuestions = [...quizData.questions];
  //             newQuestions[0].options[2] = e.target.value;
  //             setQuizData((prevData) => ({
  //               ...prevData,
  //               questions: newQuestions,
  //             }));
  //           }}
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label>option 4</label>
  //         <input
  //           type="text"
  //           className="form-control"
  //           name="options[3]"
  //           value={quizData.questions[0].options[3] || ""}
  //           onChange={(e) => {
  //             const newQuestions = [...quizData.questions];
  //             newQuestions[0].options[3] = e.target.value;
  //             setQuizData((prevData) => ({
  //               ...prevData,
  //               questions: newQuestions,
  //             }));
  //           }}
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label>Answer</label>
  //         <input
  //           type="text"
  //           className="form-control"
  //           name="answer"
  //           value={quizData.questions[0].answer || ""}
  //           onChange={(e) => {
  //             const newQuestions = [...quizData.questions];
  //             newQuestions[0].answer = e.target.value;
  //             setQuizData((prevData) => ({
  //               ...prevData,
  //               questions: newQuestions,
  //             }));
  //           }}
  //         />
  //       </div>

  //       <button type="submit" className="btn btn-primary mt-3">
  //         Update Quiz
  //       </button>
  //     </form>

  //     <Link
  //       id="go-to-quiz-list"
  //       to="/createQuiz"
  //       style={{ display: "none" }}
  //     ></Link>
  //   </div>
  // );
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

        {/* Map through all questions */}
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
            {/* Map through options */}
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
            {/* Answer field */}
            <div className="form-group">
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
            </div>
            <hr /> {/* Separator between questions */}
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
