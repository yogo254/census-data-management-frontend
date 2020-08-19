import {
  ADD_WORK,
  REMOVE_WORK,
  PERSON_UPDATE,
  ADD_ALERT,
  REMOVE_ALERT,
  PERSON_CLEAR,
  ADD_EMPTY_EDUCATION,
  ADD_EMPTY_WORK,
  ADD_EDUCATION,
  REMOVE_EDUCATION,
  INIT_EDUCATION,
  INIT_WORK
} from "./types";
import { serverAddress } from "../config/Config";
import uuid from "uuid/v4";

import axios from "axios";

export const initWork = () => dispatch => {
  dispatch({ type: INIT_WORK });
};
export const initEducation = () => dispatch => {
  dispatch({ type: INIT_EDUCATION });
};

export const addEmptyWork = () => dispatch => {
  dispatch({ type: ADD_EMPTY_WORK });
};

export const addEmptyEducation = () => dispatch => {
  dispatch({ type: ADD_EMPTY_EDUCATION });
};

export const addWork = work => dispatch => {
  dispatch({
    type: ADD_WORK,
    payload: work
  });
};

export const removeWork = id => dispatch => {
  dispatch({
    type: REMOVE_WORK,
    payload: id
  });
};

export const addEducation = education => dispatch => {
  dispatch({
    type: ADD_EDUCATION,
    payload: education
  });
};

export const removeEducation = id => dispatch => {
  dispatch({
    type: REMOVE_EDUCATION,
    payload: id
  });
};

export const personUpdate = person => dispatch => {
  dispatch({
    type: PERSON_UPDATE,
    payload: person
  });
};

export const addNewPerson = person => dispatch => {
  axios.post(`${serverAddress}/api/person/register`, person).then(res => {
    let id = uuid();
    dispatch({ type: ADD_ALERT, payload: { id, ...res.data } });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 10000);
  });
};

export const clearPerson = () => dispatch => {
  dispatch({ type: PERSON_CLEAR });
};
