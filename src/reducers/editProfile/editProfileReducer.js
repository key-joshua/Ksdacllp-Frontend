import { editProfileTypes } from '../../actionTypes';

export default (state, { type, payload }) => {
  switch (type) {
    case editProfileTypes.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        loading: true,
        data: payload,
      };
    case editProfileTypes.EDIT_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        data: payload,
      };

    default:
      return null;
  }
};
