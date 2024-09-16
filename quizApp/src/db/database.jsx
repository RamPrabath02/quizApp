import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const DataBase = () => {
  const [quizData, setQuizData] = useState([]);
  const [id, setID] = useState(0);
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");
  const [quizName, setQuizname] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    id: 0,
    question: "",
    options: ["", "", "", ""],
    answer: "",
    quizName: "",
  });
  const handleShowModal = (question) => {
    setCurrentQuestion(question);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => setShowModal(false);

  // Handle form input changes for the modal fields
  const handleInputChange = (e) => {
    setCurrentQuestion({ ...currentQuestion, [e.target.name]: e.target.value });
  };

  // Handle changes to options in the modal
  const handleOptionChange = (e, index) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = e.target.value;
    setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
  };

  // Fetch quiz data from Flask API
  useEffect(() => {
    fetch("http://localhost:8000/quiz")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched quiz data:", data);
        setQuizData(data);
        setID(data.length + 1);
      })
      .catch((err) => {
        console.log("Fetch error:", err.message);
      });
  }, []);

  // Add a new question
  const nextQuestion = (e) => {
    e.preventDefault();

    const newQuestion = {
      id: id,
      question: question,
      options: [option1, option2, option3, option4],
      answer: answer,
      quizName: quizName,
    };

    fetch("http://127.0.0.1:5000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Question added successfully");
        setQuizData([...quizData, data]);
        setValuesNull();
      })
      .catch((err) => {
        console.log("Error:", err.message);
      });
  };

  // Delete a question
  const deleteQuestion = (id) => {
    fetch(`http://localhost:8000/delete/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Question deleted successfully");
        // Remove the question from the local state
        setQuizData(quizData.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.error("Error deleting:", err.message);
      });
  };

  // Update a question
  const updateQuestion = (id) => {
    fetch(`http://localhost:8000/update/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentQuestion),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Question updated successfully");
        // Update the question in the local state
        setQuizData(
          quizData.map((item) => (item.id === id ? { ...item, ...data } : item))
        );
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Error updating:", err.message);
      });
  };

  // Reset form values
  const setValuesNull = () => {
    setID(id + 1);
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAnswer("");
    setQuizname("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("All questions submitted successfully!");
  };

  return (
    <div>
      <h1>Database</h1>
      <div className="container p-2">
        <div className="text-center">
          <form className="form card p-2 shadow">
            <div className="mb-3">
              <label htmlFor="QuizName">QuizName</label>
              <br />
              <input
                id="QuizName"
                type="text"
                value={quizName}
                onChange={(e) => setQuizname(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="question">Question</label>
              <br />
              <input
                id="question"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="option1">Option 1</label>
              <br />
              <input
                id="option1"
                type="text"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="option2">Option 2</label>
              <br />
              <input
                id="option2"
                type="text"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="option3">Option 3</label>
              <br />
              <input
                id="option3"
                type="text"
                value={option3}
                onChange={(e) => setOption3(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="option4">Option 4</label>
              <br />
              <input
                id="option4"
                type="text"
                value={option4}
                onChange={(e) => setOption4(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="answer">Answer</label>
              <br />
              <input
                id="answer"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <div>
              <button
                className="btn btn-success"
                type="submit"
                onClick={nextQuestion}
              >
                Next question
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary m-2"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Options</th>
              <th>Answer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizData && quizData.length > 0 ? (
              quizData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.question}</td>
                  <td>
                    {item.options.map((option, index) => (
                      <div key={index}>{option}</div>
                    ))}
                  </td>
                  <td>{item.answer}</td>
                  <td>
                    <button
                      className="btn btn-secondary m-2"
                      onClick={() => handleShowModal(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger m-2"
                      onClick={() => deleteQuestion(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No quiz data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bootstrap Modal for editing */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                name="question"
                value={currentQuestion.question}
                onChange={handleInputChange}
              />
            </Form.Group>
            {currentQuestion.options.map((option, index) => (
              <Form.Group key={index} className="mb-3">
                <Form.Label>Option {index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(e, index)}
                />
              </Form.Group>
            ))}
            <Form.Group className="mb-3">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                type="text"
                name="answer"
                value={currentQuestion.answer}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => updateQuestion(currentQuestion.id)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DataBase;
