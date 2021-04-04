import { addUserTypes } from '../../actionTypes';

export default (state, { type, payload }) => {
  switch (type) {
    case addUserTypes.ADD_USER_SUCCESS:
      return {
        ...state,
        loading: true,
        data: payload,
      };
    case addUserTypes.ADD_USER_FAILURE:
      return {
        ...state,
        loading: false,
        data: payload,
      };

    default:
      return null;
  }
};
