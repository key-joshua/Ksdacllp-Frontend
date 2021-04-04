import editProfileInitialState from './editProfile';
import removeUserInitialState from './removeUser';
import viewUsersInitialState from './viewUsers';
import editUserInitialState from './editUser';
import addUserInitialState from './addUser';

import loginUserInitialState from './auth/loginUser';
import logoutUserInitialState from './auth/logoutUser';
import resendLinkInitialState from './auth/resendLink';
import verifyAccountInitialState from './auth/verifyAccount';

export default {
  loginUserInitialState,
  resendLinkInitialState,
  logoutUserInitialState,
  verifyAccountInitialState,

  addUserInitialState,
  editUserInitialState,
  viewUsersInitialState,
  removeUserInitialState,
  editProfileInitialState,
};
