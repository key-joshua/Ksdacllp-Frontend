import axios from 'axios';
import { apiList } from '../../helpers';
import { logoutTypes } from '../../actionTypes';

export const logoutUser = (session) => {
  const config = { headers: { session } };
  return (dispatch) => axios.get(apiList.LOGOUT_USER_API, config)
    .then((response) => {
      dispatch({
        type: logoutTypes.LOUT_SUCCESS,
        payload: response.data
      });
    })
    .catch((error) => {
      dispatch({
        type: logoutTypes.LOUT_FAILURE,
        payload: error.response.data
      });
    });
};
