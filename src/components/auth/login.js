/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import Loading from '../loading/loading';
import { loginUser } from '../../actions';
import { validateLogin, variables } from '../../helpers';

const successTimeOut = variables.SUCCESS_TIMEOUT;
const errorTimeOut = variables.ERROR_TIMEOUT;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      result: '',
      email: '',
      password: '',
      formClass: '',
      emailClass: '',
      passwordClass: '',
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.loadedData === true) {
      localStorage.setItem('data', JSON.stringify(props.data.data));
      setTimeout(() => { window.location.href = '/users'; }, successTimeOut);
    }

    if (props.loadedData === false) {
      toast.error(props.data.message);
      setTimeout(() => { this.setState({ formClass: 'form-result', result: props.data.message }); }, errorTimeOut);
    }
  }

  handleChange(key) {
    key.preventDefault();
    this.setState({
      result: null,
      formClass: '',
      emailClass: '',
      passwordClass: '',
      [key.target.id]: key.target.value,
    });
  }

  handleLogin(key) {
    key.preventDefault();
    const { error, result, formClass, emailClass, passwordClass, } = validateLogin(this.state);

    if (error === true) {
      this.setState({ result, formClass, emailClass, passwordClass, });
      return;
    }

    const { loginCurrentUser } = this.props;
    this.setState({ result: true });
    loginCurrentUser(this.state);
  }

  render() {
    const {
      result,
      email,
      password,
      formClass,
      emailClass,
      passwordClass,
    } = this.state;

    return (

      <div className="login-page">

        <ToastContainer />

        <div className="login-container">

          <div className="login-header">
            <h2>LOGIN</h2>
            <h3>Login User Account</h3>
          </div>

          <form className="login-form">

            <input
              id="email"
              value={email}
              type="email"
              placeholder="email"
              className={emailClass}
              onChange={(id) => this.handleChange(id)}
            />

            <input
              id="password"
              value={password}
              type="password"
              placeholder="Password"
              className={passwordClass}
              onChange={(id) => this.handleChange(id)}
            />

            <div className={formClass}>
              {result === true ? <Loading MainProps={this.props} Case /> : result}
            </div>

            <button
              type="button"
              onClick={(key) => { this.handleLogin(key); }}
            >
              Login
            </button>

            <div className="send-link-forget">

              <a href="/resend-verification-link/resetPassword"> Forgot Password ? </a>
              <span> | </span>
              <a href="/resend-verification-link/verifyAccount"> Verify Account ? </a>

            </div>

          </form>

        </div>

      </div>
    );
  }
}

Login.defaultProps = {
  loadedData: null,
  data: {},

  loginCurrentUser: PropTypes.func,
};

Login.propTypes = {
  loadedData: PropTypes.bool,
  data: PropTypes.shape(),

  loginCurrentUser: PropTypes.func,
};

const mapStateToProps = ({ loginUserInitialState }) => (
  {
    loadedData: loginUserInitialState.loading,
    data: loginUserInitialState.data,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    loginCurrentUser: (state) => {
      dispatch(loginUser(state));
    },

  });

export default connect(mapStateToProps, mapDispatchToProps)(Login);
