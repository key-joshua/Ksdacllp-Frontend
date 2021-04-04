import removeUserInitialState from '../../store/initialState';
import removeUserReducer from './removeUserReducer';

export default (state = removeUserInitialState, action) => {
  const removeUser = removeUserReducer(state, action);
  return (removeUser || state);
};
