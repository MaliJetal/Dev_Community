import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';

//Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('./login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload : err.response.data
      })
    );
};

//Login User - Get user token
export const loginUser = (userData) =>  dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res =>{
      //save to localstorage
      const {token} = res.data;
      //set token to ls
      localStorage.setItem('jwtToken', token);
      //set token to Auth Header
      setAuthToken(token);
      //Decode token to get user data
      const decodedUserData = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decodedUserData));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};

//set logged in user
export const setCurrentUser = (decoded) => {
  //dispatch(clearErrors());
  return{
    type : SET_CURRENT_USER,
    payload : decoded
  }
}

//logged out user
export const logoutUser = () => dispatch => {
  dispatch(clearErrors());
  //remove token from ls
  localStorage.removeItem('jwtToken');
  //remove auth header for future req
  setAuthToken(false);
  //set current user = {} which will set  isAuthenticated to false
  dispatch(setCurrentUser({}));
}

export const clearErrors = () => {
  return{
    type: CLEAR_ERRORS
  }
}
