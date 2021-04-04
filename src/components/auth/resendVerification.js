/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import Loading from '../loading/loading';
import { resendLink } from '../../actions';
import { validateResendLink, variables } from '../../helpers';

const successTimeOut = variables.SUCCESS_TIMEOUT;
const errorTimeOut = variables.ERROR_TIMEOUT;

class ResendVerificationLink extends Component {
  constructor() {
    super();
    this.state = {
      result: '',
      email: '',
      formClass: '',
      emailClass: '',
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.loadedData === true) {
      toast.error(props.data.message);
      setTimeout(() => { this.setState({ result: props.data.message }); }, successTimeOut);
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

  handleResendLink(key) {
    key.preventDefault();
    const { resendCurrentLink, match } = this.props;
    const { error, result, formClass, emailClass } = validateResendLink(this.state);

    if (error === true) {
      this.setState({ result, formClass, emailClass, });
      return;
    }

    this.setState({ result: true });
    resendCurrentLink(this.state, match.params.status);
  }

  render() {
    const {
      result,
      email,
      formClass,
      emailClass,
    } = this.state;

    return (

      <div className="login-page">

        <ToastContainer />

        <div className="login-container">

          <div className="login-header">
            <h2>SEND LINK</h2>
            <h3>Send Verification Link</h3>
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

            <div className={`${formClass} form`}>
              {result === true ? <Loading MainProps={this.props} Case /> : result}
            </div>

            <button
              type="button"
              onClick={(key) => { this.handleResendLink(key); }}
            >
              Resend Link
            </button>

            <div className="login-option">

              <a href="/login"> Login Now ? </a>

            </div>

          </form>

        </div>

      </div>
    );
  }
}

ResendVerificationLink.defaultProps = {
  loadedData: null,
  data: {},

  match: {},
  resendCurrentLink: PropTypes.func,
};

ResendVerificationLink.propTypes = {
  loadedData: PropTypes.bool,
  data: PropTypes.shape(),

  match: PropTypes.shape(),
  resendCurrentLink: PropTypes.func,
};

const mapStateToProps = ({ resendLinkInitialState }) => (
  {
    loadedData: resendLinkInitialState.loading,
    data: resendLinkInitialState.data,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    resendCurrentLink: (state, status) => {
      dispatch(resendLink(state, status));
    },

  });

export default connect(mapStateToProps, mapDispatchToProps)(ResendVerificationLink);
