import axios from 'axios';
import { apiList } from '../../helpers';
import { verifyAccountTypes } from '../../actionTypes';

export const verifyAccount = (session) => (dispatch) => axios.get(`${apiList.VERIFY_ACCOUNT_API}/${session}`)
  .then((response) => {
    dispatch({
      type: verifyAccountTypes.VERIFY_ACCOUNT_SUCCESS,
      payload: response.data
    });
  })
  .catch((error) => {
    dispatch({
      type: verifyAccountTypes.VERIFY_ACCOUNT_FAILURE,
      payload: error.response.data
    });
  });
