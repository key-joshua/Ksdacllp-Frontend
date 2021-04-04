import axios from 'axios';
import { apiList } from '../../helpers';
import { loginTypes } from '../../actionTypes';

export const loginUser = (state) => {
  const { email, password } = state;
  return (dispatch) => axios.post(apiList.LOGIN_USER_API, { email, password })
    .then((response) => {
      dispatch({
        type: loginTypes.LOGIN_SUCCESS,
        payload: response.data
      });
    })
    .catch((error) => {
      dispatch({
        type: loginTypes.LOGIN_FAILURE,
        payload: error.response.data
      });
    });
};
