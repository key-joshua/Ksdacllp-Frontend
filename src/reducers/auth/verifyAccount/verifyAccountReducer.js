import { verifyAccountTypes } from '../../../actionTypes';

export default (state, { type, payload }) => {
  switch (type) {
    case verifyAccountTypes.VERIFY_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: true,
        data: payload,
      };
    case verifyAccountTypes.VERIFY_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        data: payload,
      };

    default:
      return null;
  }
};
