import React, { useState } from "react";

const CreateQuiz = () => {
  const [quizData, setQuizData] = useState([]);

  const addtoJson = (e) => {
    e.preventDefault();

    const question = document.getElementById("question").value;
    const option1 = document.getElementById("option1").value;
    const option2 = document.getElementById("option2").value;
    const option3 = document.getElementById("option3").value;
    const option4 = document.getElementById("option4").value;
    const answer = document.getElementById("answer").value;

    const obj = {
      id: Math.random(),
      question: question,
      options: [option1, option2, option3, option4],
      answer: answer,
    };

    setQuizData([...quizData, obj]);
    console.log("Values added to the JSON:", obj);

    document.getElementById("quizForm").reset();
  };

  const downloadJson = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(quizData, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "quizData.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Quiz Forms</h1>
      <div className="forms card p-4 shadow">
        <form id="quizForm">
          <div className="mb-3">
            <label htmlFor="question" className="form-label">
              Question
            </label>
            <input
              type="text"
              id="question"
              name="question"
              className="form-control"
              size="50"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="option1" className="form-label">
              Option 1
            </label>
            <input
              type="text"
              id="option1"
              name="option1"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="option2" className="form-label">
              Option 2
            </label>
            <input
              type="text"
              id="option2"
              name="option2"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="option3" className="form-label">
              Option 3
            </label>
            <input
              type="text"
              id="option3"
              name="option3"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="option4" className="form-label">
              Option 4
            </label>
            <input
              type="text"
              id="option4"
              name="option4"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="answer" className="form-label">
              Answer
            </label>
            <input
              type="text"
              id="answer"
              name="answer"
              className="form-control"
              required
            />
          </div>
          <input
            type="submit"
            id="submit"
            value="Add next question"
            onClick={addtoJson}
            className="btn btn-primary"
          />
        </form>
      </div>
      <div className="text-center mt-4">
        <button onClick={downloadJson} className="btn btn-success">
          Submit the JSON and Download
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
