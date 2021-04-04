/* eslint-disable camelcase */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import Loading from '../loading/loading';
import { editProfile } from '../../actions';
import { validateResetPassword, variables } from '../../helpers';

const errorTimeOut = variables.ERROR_TIMEOUT;
class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      result: '',
      formClass: '',
      passwordClass: '',
      confirmPasswordClass: '',

      email: '',
      userName: '',
      password: '',
      confirmPassword: '',
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.loadedData === true) {
      toast.success('Password updated successfully');
      this.setState({ password: '', confirmPassword: '' });
      localStorage.setItem('data', JSON.stringify(props.data.data));

      setTimeout(() => { window.location.href = '/users'; }, 8000);
      setTimeout(() => { this.setState({ result: 'Password updated successfully' }); }, errorTimeOut);
    }

    if (props.loadedData === false) {
      toast.error(props.data.message);
      setTimeout(() => { this.setState({ result: false }); }, errorTimeOut);
    }
  }

  handleChange(key) {
    key.preventDefault();
    this.setState({
      result: null,
      formClass: '',
      passwordClass: '',
      confirmPasswordClass: '',
      [key.target.id]: key.target.value,
    });
  }

  handleUpdate(key) {
    key.preventDefault();
    const { editCurrentProfile, match } = this.props;
    const { error, result, formClass, passwordClass, confirmPasswordClass } = validateResetPassword(this.state);

    if (error === true) {
      this.setState({ result, formClass, passwordClass, confirmPasswordClass, });
      return;
    }

    this.setState({ result: true });
    editCurrentProfile(match.params.session, this.state);
  }

  render() {
    const {
      result,
      password,
      confirmPassword,
      formClass,
      passwordClass,
      confirmPasswordClass,
    } = this.state;

    return (

      <div className="login-page">

        <ToastContainer />

        <div className="login-container">

          <div className="login-header">
            <h2>RESET PASSWORD</h2>
            <h3>Reset User Password</h3>
          </div>

          <form className="login-form">

            <input
              id="password"
              value={password}
              type="password"
              placeholder="Password"
              className={passwordClass}
              onChange={(id) => this.handleChange(id)}
            />

            <input
              id="confirmPassword"
              value={confirmPassword}
              type="password"
              placeholder="Confirm Password"
              className={confirmPasswordClass}
              onChange={(id) => this.handleChange(id)}
            />

            <div className={`${formClass} form`}>
              {result === true ? <Loading MainProps={this.props} Case /> : result}
            </div>

            <button
              type="button"
              onClick={(key) => { this.handleUpdate(key); }}
            >
              Reset Password
            </button>

            <div className="send-link-forget">

              <a href="/login"> Login Now ? </a>
              <span> | </span>
              <a href="/resend-verification-link/verifyAccount"> Verify Account ? </a>

            </div>

          </form>

        </div>

      </div>
    );
  }
}

ResetPassword.defaultProps = {
  loadedData: null,
  data: {},

  match: {},
  editCurrentProfile: PropTypes.func,
};

ResetPassword.propTypes = {
  loadedData: PropTypes.bool,
  data: PropTypes.shape(),

  match: PropTypes.shape(),
  editCurrentProfile: PropTypes.func,
};

const mapStateToProps = ({ editProfileInitialState }) => (
  {
    loadedData: editProfileInitialState.loading,
    data: editProfileInitialState.data,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    editCurrentProfile: (session, state) => {
      dispatch(editProfile(session, state));
    },

  });

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
