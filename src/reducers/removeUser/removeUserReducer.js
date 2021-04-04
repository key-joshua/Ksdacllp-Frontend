import { remveUserTypes } from '../../actionTypes';

export default (state, { type, payload }) => {
  switch (type) {
    case remveUserTypes.REMOVE_USER_SUCCESS:
      return {
        ...state,
        loading: true,
        data: payload,
      };
    case remveUserTypes.REMOVE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        data: payload,
      };

    default:
      return null;
  }
};
