import { viewUsersTypes } from '../../actionTypes';

export default (state, { type, payload }) => {
  switch (type) {
    case viewUsersTypes.VIEW_USERS_SUCCESS:
      return {
        ...state,
        loading: true,
        data: payload,
      };
    case viewUsersTypes.VIEW_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        data: payload,
      };

    default:
      return null;
  }
};
