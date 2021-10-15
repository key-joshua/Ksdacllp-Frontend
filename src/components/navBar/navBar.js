/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../../assets/images/logo.png';

import Loading from '../loading/loading';

class navbar extends Component {
  constructor() {
    super();
    this.state = {
      result: false,
      logo: Logo,
    };
  }

  handleHomeAccounts(key) {
    key.preventDefault();
    this.setState({ result: true });

    const redirectUrl = '/';

    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 1000);
  }

  handleLogo(key) {
    key.preventDefault();
    this.setState({ result: true });

    const redirectUrl = '/';
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 1000);
  }

  render() {
    const { result, logo } = this.state;

    return (
      <div className="navbar-page">

        { result === true ? <Loading MainProps={this.props.MainProps} /> : null }

        <div className="main-nav">

          <img className="logo" src={logo} alt="logo" onClick={(key) => { this.handleLogo(key); }} />

          <div className="nav-links">

            <span className="active" onClick={(key) => { this.handleHomeAccounts(key); }}> <FontAwesomeIcon icon={faTachometerAlt} className="icon" /> DASHBOARD </span>

          </div>

        </div>
      </div>
    );
  }
}

export default navbar;
