import addUserInitialState from '../../store/initialState';
import addUserReducer from './addUserReducer';

export default (state = addUserInitialState, action) => {
  const addUser = addUserReducer(state, action);
  return (addUser || state);
};
