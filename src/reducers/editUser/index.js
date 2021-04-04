import editUserInitialState from '../../store/initialState';
import editUserReducer from './editUserReducer';

export default (state = editUserInitialState, action) => {
  const editUser = editUserReducer(state, action);
  return (editUser || state);
};
