import dotenv from 'dotenv';
import * as variables from './variables';

dotenv.config();
export const DEFAULT_API = variables.BACKEND_URL;
export const ADD_USER_API = `${variables.BACKEND_URL}/${process.env.REACT_APP_ADD_USER}`;
export const EDIT_USER_API = `${variables.BACKEND_URL}/${process.env.REACT_APP_EDIT_USER}`;
export const VEIW_USERS_API = `${variables.BACKEND_URL}/${process.env.REACT_APP_VIEW_USERS}`;
export const LOGIN_USER_API = `${variables.BACKEND_URL}/${process.env.REACT_APP_LOGIN_USER}`;
export const LOGOUT_USER_API = `${variables.BACKEND_URL}/${process.env.REACT_APP_LOGOUT_USER}`;
export const REMOVE_USER_API = `${variables.BACKEND_URL}/${process.env.REACT_APP_REMOVE_USER}`;
export const RESEND_LINK_API = `${variables.BACKEND_URL}/${process.env.REACT_APP_RESEND_LINK}`;
export const EDIT_PROFILE_API = `${variables.BACKEND_URL}/${process.env.REACT_APP_EDIT_PROFILE}`;
export const VERIFY_ACCOUNT_API = `${variables.BACKEND_URL}/${process.env.REACT_APP_VERIFY_ACCOUNT}`;
