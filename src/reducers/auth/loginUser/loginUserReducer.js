import { loginTypes } from '../../../actionTypes';

export default (state, { type, payload }) => {
  switch (type) {
    case loginTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: true,
        data: payload,
      };
    case loginTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        data: payload,
      };

    default:
      return null;
  }
};
