import axios from 'axios';
import { apiList } from '../../helpers';
import { editUserTypes } from '../../actionTypes';

export const editUser = (session, userId, state) => {
  const data = new FormData();
  const config = { headers: { session } };
  const { profilePicture, userName, email } = state;

  if (email !== '') { data.append('email', email); }
  if (userName !== '') { data.append('userName', userName); }
  if (typeof (profilePicture) !== 'string') { data.append('profilePicture', profilePicture); }

  return (dispatch) => axios.patch(`${apiList.EDIT_USER_API}/${userId}`, data, config)
    .then((response) => {
      dispatch({
        type: editUserTypes.EDIT_USER_SUCCESS,
        payload: response.data
      });
    })
    .catch((error) => {
      dispatch({
        type: editUserTypes.EDIT_USER_FAILURE,
        payload: error.response.data
      });
    });
};
