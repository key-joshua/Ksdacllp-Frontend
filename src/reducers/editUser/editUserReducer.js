import { editUserTypes } from '../../actionTypes';

export default (state, { type, payload }) => {
  switch (type) {
    case editUserTypes.EDIT_USER_SUCCESS:
      return {
        ...state,
        loading: true,
        data: payload,
      };
    case editUserTypes.EDIT_USER_FAILURE:
      return {
        ...state,
        loading: false,
        data: payload,
      };

    default:
      return null;
  }
};
