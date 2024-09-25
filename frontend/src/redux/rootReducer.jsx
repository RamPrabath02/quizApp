// src/redux/reducers/index.js
import { combineReducers } from "redux";
import quizReducer from "./reducers/quizReducer";

export default combineReducers({
  quiz: quizReducer,
});
