// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import axios from "../services/api"; // Import the Axios instance
// import QuizList from "./components2/QuizList";
// import CreateQuiz from "./components2/CreateQuiz";
// import QuizDetails from "./components2/QuizDetails";
// import backendClient from "../services/api";

// function App2() {
//   const [quizzes, setQuizzes] = useState([]);

//   useEffect(() => {
//     fetchQuizzes();
//   }, []);

//   const fetchQuizzes = async () => {
//     try {
//       const response = await backendClient.get("/quiz");
//       console.log(response.data);
//       setQuizzes(response.data);
//     } catch (error) {
//       console.error("Error fetching quizzes:", error);
//     }
//   };

//   const handleDeleteQuiz = async (quizId) => {
//     try {
//       await axios.delete(`/deleteQuiz/${quizId}`);
//       fetchQuizzes(); // Refresh the list after deletion
//     } catch (error) {
//       console.error("Error deleting quiz:", error);
//     }
//   };

//   return (
//     <Router>
//       <div className="container">
//         <nav>
//           <Link to="/">Home</Link>
//           <Link to="/createQuiz">Create New Quiz</Link>
//         </nav>

//         <Routes>
//           <Route
//             path="/"
//             element={<QuizList quizzes={quizzes} onDelete={handleDeleteQuiz} />}
//           />
//           <Route
//             path="/createQuiz"
//             element={<CreateQuiz fetchQuizzes={fetchQuizzes} />}
//           />
//           <Route path="/quiz/:quizId" element={<QuizDetails />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App2;
// // import { useState, useEffect } from "react";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import { useNavigate } from "react-router-dom"; // For routing
// // import "./App.css";

// // function App() {
// //   const [quizzes, setQuizzes] = useState([]);
// //   const navigate = useNavigate(); // For navigation to QuizPage

// //   useEffect(() => {
// //     fetch("http://localhost:8000/quiz")
// //       .then((res) => res.json())
// //       .then((data) => {
// //         setQuizzes(data); // Set quiz data from backend
// //         console.log(data);
// //       })
// //       .catch((err) => {
// //         console.log("Fetch error:", err.message);
// //       });
// //   }, []);

// //   // Handle quiz selection
// //   const handleSelectQuiz = (quizId) => {
// //     navigate(`/quiz/${quizId}`); // Redirect to the quiz page with the selected quiz ID
// //   };

// //   return (
// //     <div className="container text-center mt-4">
// //       <h1 className="mb-4">Quiz App</h1>

// //       <div className="text-center">
// //         <button
// //           className="btn btn-primary"
// //           onClick={() => navigate("/createQuiz")}
// //         >
// //           Create New Quiz
// //         </button>
// //       </div>

// //       <div className="container mt-4">
// //         <h2>Available Quizzes</h2>
// //         <ul className="list-group">
// //           {quizzes.map((quiz) => (
// //             <li
// //               key={quiz.id}
// //               className="list-group-item d-flex justify-content-between align-items-center"
// //             >
// //               {quiz.quizName}
// //               <div>
// //                 <button
// //                   className="btn btn-success mx-2"
// //                   onClick={() => handleSelectQuiz(quiz.id)}
// //                 >
// //                   Select Quiz
// //                 </button>
// //                 <button
// //                   className="btn btn-danger mx-2"
// //                   onClick={() => handleDeleteQuiz(quiz.id)}
// //                 >
// //                   Delete Quiz
// //                 </button>
// //               </div>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;

// // import React, { useState } from "react";
// // import Home from "./Home"; // Home page where quizzes will be listed
// // import Login from "./components2/Login";

// // const App = () => {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);

// //   return <div>{isLoggedIn ? <Home /> : <Login onLogin={setIsLoggedIn} />}</div>;
// // };

// // export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "../services/api";
import QuizList from "./components2/QuizList";
import CreateQuiz from "./components2/CreateQuiz";
import QuizDetails from "./components2/QuizDetails";
import QuizPage from "./components2/QuizPage";
import HomePage from "./components2/HomePage";
import Login from "./components2/Login";
import "bootstrap/dist/css/bootstrap.min.css";

function App2() {
  const [quizzes, setQuizzes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Check for admin login

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("/quiz");
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      await axios.delete(`/deleteQuiz/${quizId}`);
      fetchQuizzes(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <Link className="navbar-brand" to="/">
            Quiz App
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              {isAdmin && (
                <li className="nav-item">
                  <Link className="nav-link" to="/createQuiz">
                    Create New Quiz
                  </Link>
                </li>
              )}
              {!isAdmin && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Admin Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage quizzes={quizzes} />} />
          <Route path="/quiz/:quizId" element={<QuizPage />} />
          <Route
            path="/createQuiz"
            element={
              isAdmin ? (
                <CreateQuiz fetchQuizzes={fetchQuizzes} />
              ) : (
                <Login setIsAdmin={setIsAdmin} />
              )
            }
          />
          <Route path="/quizDetails/:quizId" element={<QuizDetails />} />
          <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App2;
