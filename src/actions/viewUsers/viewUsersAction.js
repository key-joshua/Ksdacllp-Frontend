import axios from 'axios';
import { apiList, variables } from '../../helpers';
import { viewUsersTypes } from '../../actionTypes';

export const viewUsers = (session, page) => {
  const config = { headers: { session } };
  return (dispatch) => axios.get(`${apiList.VEIW_USERS_API}?page=${page}&limit=${variables.LIMITS}`, config)
    .then((response) => {
      dispatch({
        type: viewUsersTypes.VIEW_USERS_SUCCESS,
        payload: response.data
      });
    })
    .catch((error) => {
      dispatch({
        type: viewUsersTypes.VIEW_USERS_FAILURE,
        payload: error.response.data
      });
    });
};
