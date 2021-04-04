import viewUsersInitialState from '../../store/initialState';
import viewUsersReducer from './viewUsersReducer';

export default (state = viewUsersInitialState, action) => {
  const viewUsers = viewUsersReducer(state, action);
  return (viewUsers || state);
};
