import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const DataBase = () => {
  const [quizList, setQuizList] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newQuiz, setNewQuiz] = useState({ quizName: "", questions: [] });
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });

  // Fetch the quiz list on component mount
  useEffect(() => {
    fetch("http://localhost:8000/quiz")
      .then((res) => res.json())
      .then((data) => {
        setQuizList(data);
      })
      .catch((err) => {
        console.log("Fetch error:", err.message);
      });
  }, []);

  // Show the form for a new quiz
  const handleNewQuiz = () => {
    setShowForm(true);
  };

  // Add a new question to the current quiz being created
  const addQuestionToQuiz = () => {
    setNewQuiz({
      ...newQuiz,
      questions: [...newQuiz.questions, newQuestion],
    });
    setNewQuestion({
      question: "",
      options: ["", "", "", ""],
      answer: "",
    });
  };

  // Submit the new quiz to the backend
  const submitNewQuiz = () => {
    fetch("http://localhost:8000/createQuiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuiz),
    })
      .then((res) => res.json())
      .then((data) => {
        setQuizList([...quizList, data]);
        setNewQuiz({ quizName: "", questions: [] });
        setShowForm(false);
      })
      .catch((err) => {
        console.error("Error:", err.message);
      });
  };

  // View a quiz and load its questions
  const viewQuiz = (quiz) => {
    setSelectedQuiz(quiz);
  };

  // Delete a quiz
  const deleteQuiz = (quizId) => {
    fetch(`http://localhost:8000/deleteQuiz/${quizId}`, {
      method: "DELETE",
    })
      .then(() => {
        setQuizList(quizList.filter((quiz) => quiz.id !== quizId));
      })
      .catch((err) => {
        console.error("Error deleting:", err.message);
      });
  };

  // Update a question in the modal
  const updateQuestion = (questionId) => {
    fetch(`http://localhost:8000/updateQuestion/${questionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentQuestion),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        const updatedQuiz = selectedQuiz.questions.map((q) =>
          q.id === questionId ? updatedQuestion : q
        );
        setSelectedQuiz({ ...selectedQuiz, questions: updatedQuiz });
        setShowModal(false);
      })
      .catch((err) => {
        console.error("Error updating:", err.message);
      });
  };

  return (
    <div>
      <h1>Quiz List</h1>
      <Button onClick={handleNewQuiz}>New Quiz</Button>
      <div>
        {quizList.length > 0 ? (
          quizList.map((quiz) => (
            <div key={quiz.id}>
              <h2>{quiz.quizName}</h2>
              <Button onClick={() => viewQuiz(quiz)}>View</Button>
              <Button onClick={() => deleteQuiz(quiz.id)}>Delete</Button>
            </div>
          ))
        ) : (
          <p>No quizzes available.</p>
        )}
      </div>

      {/* Show Quiz Details */}
      {selectedQuiz && (
        <div>
          <h2>{selectedQuiz.quizName}</h2>
          {selectedQuiz.questions.map((q) => (
            <div key={q.id}>
              <p>Question: {q.question}</p>
              <Button onClick={() => setShowModal(true)}>Edit</Button>
              <Button
                onClick={() => deleteQuestionFromQuiz(selectedQuiz.id, q.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* New Quiz Form */}
      {showForm && (
        <div>
          <h2>Create New Quiz</h2>
          <Form>
            <Form.Group>
              <Form.Label>Quiz Name</Form.Label>
              <Form.Control
                type="text"
                value={newQuiz.quizName}
                onChange={(e) =>
                  setNewQuiz({ ...newQuiz, quizName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                value={newQuestion.question}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, question: e.target.value })
                }
              />
            </Form.Group>
            {newQuestion.options.map((opt, idx) => (
              <Form.Group key={idx}>
                <Form.Label>Option {idx + 1}</Form.Label>
                <Form.Control
                  type="text"
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...newQuestion.options];
                    newOptions[idx] = e.target.value;
                    setNewQuestion({ ...newQuestion, options: newOptions });
                  }}
                />
              </Form.Group>
            ))}
            <Form.Group>
              <Form.Label>Answer</Form.Label>
              <Form.Control
                type="text"
                value={newQuestion.answer}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, answer: e.target.value })
                }
              />
            </Form.Group>
            <Button onClick={addQuestionToQuiz}>Next Question</Button>
            <Button onClick={submitNewQuiz}>Submit Quiz</Button>
          </Form>
        </div>
      )}

      {/* Edit Question Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                value={currentQuestion.question}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    question: e.target.value,
                  })
                }
              />
            </Form.Group>
            {currentQuestion.options.map((opt, idx) => (
              <Form.Group key={idx}>
                <Form.Label>Option {idx + 1}</Form.Label>
                <Form.Control
                  type="text"
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...currentQuestion.options];
                    newOptions[idx] = e.target.value;
                    setCurrentQuestion({
                      ...currentQuestion,
                      options: newOptions,
                    });
                  }}
                />
              </Form.Group>
            ))}
            <Form.Group>
              <Form.Label>Answer</Form.Label>
              <Form.Control
                type="text"
                value={currentQuestion.answer}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    answer: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => updateQuestion(currentQuestion.id)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DataBase;
