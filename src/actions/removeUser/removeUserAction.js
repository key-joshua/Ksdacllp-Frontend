import axios from 'axios';
import { apiList } from '../../helpers';
import { remveUserTypes } from '../../actionTypes';

export const removeUser = (session, userId) => {
  const config = { headers: { session } };

  return (dispatch) => axios.delete(`${apiList.REMOVE_USER_API}/${userId}`, config)
    .then((response) => {
      dispatch({
        type: remveUserTypes.REMOVE_USER_SUCCESS,
        payload: response.data
      });
    })
    .catch((error) => {
      dispatch({
        type: remveUserTypes.REMOVE_USER_FAILURE,
        payload: error.response.data
      });
    });
};
