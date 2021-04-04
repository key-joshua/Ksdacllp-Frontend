import axios from 'axios';
import { apiList } from '../../helpers';
import { editProfileTypes } from '../../actionTypes';

export const editProfile = (session, state) => {
  const data = new FormData();
  const config = { headers: { session } };
  const { profilePicture, userName, email, password, confirmPassword } = state;

  if (email !== '') { data.append('email', email); }
  if (userName !== '') { data.append('userName', userName); }
  if (password !== '') { data.append('password', password); }
  if (profilePicture) { data.append('profilePicture', profilePicture); }
  if (confirmPassword !== '') { data.append('confirmPassword', confirmPassword); }

  return (dispatch) => axios.patch(apiList.EDIT_PROFILE_API, data, config)
    .then((response) => {
      dispatch({
        type: editProfileTypes.EDIT_PROFILE_SUCCESS,
        payload: response.data
      });
    })
    .catch((error) => {
      dispatch({
        type: editProfileTypes.EDIT_PROFILE_FAILURE,
        payload: error.response.data
      });
    });
};
