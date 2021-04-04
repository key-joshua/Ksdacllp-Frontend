import { logoutTypes } from '../../../actionTypes';

export default (state, { type, payload }) => {
  switch (type) {
    case logoutTypes.LOUT_SUCCESS:
      return {
        ...state,
        loading: true,
        data: payload,
      };
    case logoutTypes.LOUT_FAILURE:
      return {
        ...state,
        loading: false,
        data: payload,
      };

    default:
      return null;
  }
};
