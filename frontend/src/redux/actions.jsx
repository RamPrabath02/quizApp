// types
export const FETCH_QUIZZES_SUCCESS = "FETCH_QUIZZES_SUCCESS";
export const FETCH_QUIZ_SUCCESS = "FETCH_QUIZ_SUCCESS";
export const CREATE_QUIZ_SUCCESS = "CREATE_QUIZ_SUCCESS";
export const UPDATE_QUIZ_SUCCESS = "UPDATE_QUIZ_SUCCESS";
export const DELETE_QUIZ_SUCCESS = "DELETE_QUIZ_SUCCESS";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

//action
export const fetchQuizzes = () => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await fetch("http://127.0.0.1:5000/quiz");
    const data = await response.json();
    dispatch({ type: FETCH_QUIZZES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

// Create a new quiz
export const createQuiz = (quiz) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await fetch("http://127.0.0.1:5000/createQuiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quiz),
    });
    const data = await response.json();
    dispatch({ type: CREATE_QUIZ_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

// Update a quiz by its ID
export const updateQuiz = (quiz) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/updateQuiz/${quiz.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quiz),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update the quiz");
    }

    const updatedQuiz = await response.json();
    dispatch({ type: UPDATE_QUIZ_SUCCESS, payload: updatedQuiz });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

// Delete a quiz by its ID
export const deleteQuiz = (quizId) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await fetch(`http://127.0.0.1:5000/deleteQuiz/${quizId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete the quiz");
    }

    dispatch({ type: DELETE_QUIZ_SUCCESS, payload: quizId });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};
