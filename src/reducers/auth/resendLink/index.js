import resendLinkInitialState from '../../../store/initialState';
import resendLinkReducer from './resendLinkReducer';

export default (state = resendLinkInitialState, action) => {
  const resendLink = resendLinkReducer(state, action);
  return (resendLink || state);
};
