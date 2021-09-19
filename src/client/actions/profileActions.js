import axios from "axios";
import {
  GET_PROFILE,
  GET_PROFILES,
  CLEAR_CURRENT_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
} from "../actions/types";

//Get Current Profile of Login User
export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("api/profile")
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PROFILE,
        payload: {},
      });
    });
};

//Get all profiles
export const getProfiles = () => (dispatch) => {
  dispatch(setProfileLoading);
  axios
    .get("api/profile/all")
    .then((res) => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PROFILES,
        payload: null,
      });
    });
};

//Get profile by handle
export const getProfileByHandle = (handle) => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/${handle}`)
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PROFILE,
        payload: null,
      });
    });
};

//create Profile
export const createProfile = (profileData, history) => (dispatch) => {
  console.log(profileData);
  axios
    .post("/api/profile", profileData)
    .then((res) => history.push("./dashbaord"))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Set loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

//Clear Current Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
