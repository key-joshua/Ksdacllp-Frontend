import verifyAccountInitialState from '../../../store/initialState';
import verifyAccountReducer from './verifyAccountReducer';

export default (state = verifyAccountInitialState, action) => {
  const verifyAccount = verifyAccountReducer(state, action);
  return (verifyAccount || state);
};
