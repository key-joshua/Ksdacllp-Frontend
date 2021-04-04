import editProfileInitialState from '../../store/initialState';
import editProfileReducer from './editProfileReducer';

export default (state = editProfileInitialState, action) => {
  const editProfile = editProfileReducer(state, action);
  return (editProfile || state);
};
