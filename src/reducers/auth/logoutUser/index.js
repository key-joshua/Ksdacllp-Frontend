import logoutUserInitialState from '../../../store/initialState';
import logoutUserReducer from './logoutUserReducer';

export default (state = logoutUserInitialState, action) => {
  const logoutUser = logoutUserReducer(state, action);
  return (logoutUser || state);
};
