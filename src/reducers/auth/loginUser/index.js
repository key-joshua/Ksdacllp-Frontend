import loginUserInitialState from '../../../store/initialState';
import loginUserReducer from './loginUserReducer';

export default (state = loginUserInitialState, action) => {
  const loginUser = loginUserReducer(state, action);
  return (loginUser || state);
};
