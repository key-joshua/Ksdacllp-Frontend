import axios from 'axios';
import { apiList } from '../../helpers';
import { resendLinkTypes } from '../../actionTypes';

export const resendLink = (state, status) => {
  const { email } = state;

  return (dispatch) => axios.post(`${apiList.RESEND_LINK_API}/${status}`, { email })
    .then((response) => {
      dispatch({
        type: resendLinkTypes.RESEND_LINK_SUCCESS,
        payload: response.data
      });
    })
    .catch((error) => {
      dispatch({
        type: resendLinkTypes.RESEND_LINK_FAILURE,
        payload: error.response.data
      });
    });
};
