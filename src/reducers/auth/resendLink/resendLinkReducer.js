import { resendLinkTypes } from '../../../actionTypes';

export default (state, { type, payload }) => {
  switch (type) {
    case resendLinkTypes.RESEND_LINK_SUCCESS:
      return {
        ...state,
        loading: true,
        data: payload,
      };
    case resendLinkTypes.RESEND_LINK_FAILURE:
      return {
        ...state,
        loading: false,
        data: payload,
      };

    default:
      return null;
  }
};
