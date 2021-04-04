/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faCogs, faTimes, faUsers, faUserCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import Loading from '../loading/loading';
import { logoutUser } from '../../actions';
import { variables, shortData, verifyLogin } from '../../helpers';

const successTimeOut = variables.SUCCESS_TIMEOUT;
class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      showSideBar: false,
      result: false,
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    const redirectUrl = '/login';

    if (props.loadedData === true) {
      localStorage.removeItem('data');
      setTimeout(() => { this.setState({ result: false }); window.location.replace(redirectUrl); }, successTimeOut);
    }

    if (props.loadedData === false) {
      localStorage.removeItem('data');
      setTimeout(() => { this.setState({ result: false }); window.location.replace(redirectUrl); }, successTimeOut);
    }
  }

  handleHome(key) {
    key.preventDefault();
    this.setState({ result: true });

    const redirectUrl = '/';
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, successTimeOut);
  }

  handleUsers(key) {
    key.preventDefault();
    this.setState({ result: true });

    const redirectUrl = '/users';
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, successTimeOut);
  }

  handleProfile(key) {
    key.preventDefault();
    this.setState({ result: true });

    const redirectUrl = '/profile';
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, successTimeOut);
  }

  handleLogout(key) {
    key.preventDefault();
    const { session } = verifyLogin();
    const { logoutCurrentUser } = this.props;

    this.setState({ result: true });
    logoutCurrentUser(session);
  }

  handleHideSideBar(key) {
    key.preventDefault();
    this.setState({ showSideBar: false });
  }

  handleShowSideBar(key) {
    key.preventDefault();
    this.setState({ showSideBar: true });
  }

  render() {
    const { MainProps } = this.props;
    const { showSideBar, result } = this.state;

    return (
      <>
        <CSSTransition classNames="alert" in={showSideBar} timeout={300} unmountOnExit>

          <aside className="side-bar">

            { result === true ? <Loading MainProps={MainProps.props} /> : null }

            <div className="side-header">

              <FontAwesomeIcon icon={faUserCog} className="icon setting-icon" onClick={(key) => { this.handleProfile(key); }} />
              <FontAwesomeIcon icon={faTimes} className="icon close-icon" onClick={(key) => { this.handleHideSideBar(key); }} />

            </div>

            <div className="side-contents">

              <div className="profile-picture" onClick={(key) => { this.handleProfile(key); }}>
                <img src={MainProps.user.profile} alt="profile" />
              </div>

              <div className="profile-info">
                <span className="profile-name" onClick={(key) => { this.handleProfile(key); }}>{showSideBar === true ? shortData(MainProps.user.userName.split(' ').slice(-1).join(' '), 5) : null } Profile</span>
                <span className="profile-status"> Online</span>
              </div>

              <div className="nav-options">

                <h2 className="head"> Title Option </h2>

                <div className="body" onClick={(key) => { this.handleHome(key); }}>
                  <span> <FontAwesomeIcon icon={faHome} className="icon" /> Home </span>
                </div>

                { this.props.MainProps.props.match.path === '/users'
                  ? (
                    <div className="body active" onClick={(key) => { this.handleUsers(key); }}>
                      <span> <FontAwesomeIcon icon={faUsers} className="icon" /> Users </span>
                    </div>
                  )
                  : (
                    <div className="body" onClick={(key) => { this.handleUsers(key); }}>
                      <span> <FontAwesomeIcon icon={faUsers} className="icon" /> Users </span>
                    </div>
                  )}

                { this.props.MainProps.props.match.path === '/profile'
                  ? (
                    <div className="body active" onClick={(key) => { this.handleProfile(key); }}>
                      <span> <FontAwesomeIcon icon={faUserCog} className="icon" /> Profile </span>
                    </div>
                  )
                  : (
                    <div className="body" onClick={(key) => { this.handleProfile(key); }}>
                      <span> <FontAwesomeIcon icon={faUserCog} className="icon" /> Profile </span>
                    </div>
                  )}

                <div className="body">
                  <span> <FontAwesomeIcon icon={faCogs} className="icon" /> Option One </span>
                </div>

                <div className="body">
                  <span> <FontAwesomeIcon icon={faCogs} className="icon" /> Option Two </span>
                </div>

                <div className="body">
                  <span> <FontAwesomeIcon icon={faCogs} className="icon" /> Option Three </span>
                </div>

                <div className="footer" onClick={(key) => { this.handleLogout(key); }}>
                  <span> <FontAwesomeIcon icon={faSignOutAlt} className="icon" /> LOGOUT </span>
                </div>

              </div>

            </div>

          </aside>

        </CSSTransition>

        <div className="hamburger-menu"> <FontAwesomeIcon icon={faBars} className="icon" onClick={(key) => { this.handleShowSideBar(key); }} /> </div>

      </>

    );
  }
}

SideBar.defaultProps = {
  loadedData: null,

  logoutCurrentUser: PropTypes.func,
};

SideBar.propTypes = {
  loadedData: PropTypes.bool,

  logoutCurrentUser: PropTypes.func,
};

const mapStateToProps = ({ logoutUserInitialState }) => (
  {
    loadedData: logoutUserInitialState.loading,
    data: logoutUserInitialState.data,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    logoutCurrentUser: (session, state) => {
      dispatch(logoutUser(session, state));
    },

  });

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
