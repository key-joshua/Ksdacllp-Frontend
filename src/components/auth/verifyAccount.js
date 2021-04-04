/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable camelcase */
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import Loading from '../loading/loading';
import { variables } from '../../helpers';
import { verifyAccount } from '../../actions';

const errorTimeOut = variables.ERROR_TIMEOUT;
class VerifyAccount extends Component {
  constructor() {
    super();
    this.state = { result: '', };
  }

  componentDidMount() {
    const { verifyCurentAccount, match } = this.props;

    this.setState({ result: true });
    verifyCurentAccount(match.params.session);
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.loadedData === true) {
      toast.success(props.data.message);

      setTimeout(() => { window.location.href = '/login'; }, 8000);
      setTimeout(() => { this.setState({ result: props.data.message }); }, errorTimeOut);
    }

    if (props.loadedData === false) {
      toast.error(props.data.message);
      setTimeout(() => { this.setState({ result: props.data.message }); }, errorTimeOut);
    }
  }

  handleLogin(key) {
    key.preventDefault();
    const redirectUrl = '/login';
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 1000);
  }

  render() {
    const { result, } = this.state;

    return (
      <div className="landing-page">

        <ToastContainer />

        {result === true ? <Loading MainProps={this.props} /> : null}

        <Helmet> <style>{'body { background-color: #ffff;}'}</style> </Helmet>

        <div className="container">

          <div className="content-container">

            <h2 className="header">{result}</h2>

            <button type="submit" onClick={(key) => { this.handleLogin(key); }}>Go With Us Now</button>

          </div>

        </div>

      </div>

    );
  }
}

VerifyAccount.defaultProps = {
  loadedData: null,
  data: {},

  match: {},
  verifyCurentAccount: PropTypes.func,
};

VerifyAccount.propTypes = {
  loadedData: PropTypes.bool,
  data: PropTypes.shape(),

  match: PropTypes.shape(),
  verifyCurentAccount: PropTypes.func,
};

const mapStateToProps = ({ verifyAccountInitialState }) => (
  {
    loadedData: verifyAccountInitialState.loading,
    data: verifyAccountInitialState.data,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    verifyCurentAccount: (session) => {
      dispatch(verifyAccount(session));
    },

  });

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAccount);
