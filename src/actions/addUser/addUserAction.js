import axios from 'axios';
import { apiList } from '../../helpers';
import { addUserTypes } from '../../actionTypes';

export const addUser = (session, state) => {
  const data = new FormData();
  const config = { headers: { session } };
  const { profilePicture, userName, email } = state;

  if (email !== '') { data.append('email', email); }
  if (userName !== '') { data.append('userName', userName); }
  if (profilePicture) { data.append('profilePicture', profilePicture); }

  return (dispatch) => axios.post(apiList.ADD_USER_API, data, config)
    .then((response) => {
      dispatch({
        type: addUserTypes.ADD_USER_SUCCESS,
        payload: response.data
      });
    })
    .catch((error) => {
      dispatch({
        type: addUserTypes.ADD_USER_FAILURE,
        payload: error.response.data
      });
    });
};
