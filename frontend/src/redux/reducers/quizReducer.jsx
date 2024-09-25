// src/redux/reducers/quizReducer.js
import {
  FETCH_QUIZZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  CREATE_QUIZ_SUCCESS,
  UPDATE_QUIZ_SUCCESS,
  DELETE_QUIZ_SUCCESS,
  SET_LOADING,
  SET_ERROR,
} from "../actions";

const initialState = {
  quizzes: [],
  currentQuiz: null,
  loading: false,
  error: null,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUIZZES_SUCCESS:
      return {
        ...state,
        quizzes: action.payload,
        error: null,
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        currentQuiz: action.payload,
        error: null,
      };
    case CREATE_QUIZ_SUCCESS:
      return {
        ...state,
        quizzes: [...state.quizzes, action.payload],
        error: null,
      };
    case UPDATE_QUIZ_SUCCESS:
      return {
        ...state,
        quizzes: state.quizzes.map((quiz) =>
          quiz.id === action.payload.id ? action.payload : quiz
        ),
        error: null,
      };
    case DELETE_QUIZ_SUCCESS:
      return {
        ...state,
        quizzes: state.quizzes.filter((quiz) => quiz.id !== action.payload),
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default quizReducer;
