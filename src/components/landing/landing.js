/* eslint-disable react/jsx-one-expression-per-line */
import Helmet from 'react-helmet';
import React, { Component } from 'react';
import { verifyLogin } from '../../helpers';

class Landing extends Component {
  handleProcced(key) {
    key.preventDefault();
    const { session, user } = verifyLogin();

    if (session && user) {
      const redirectUrl = '/users';
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1000);
      return;
    }

    const redirectUrl = '/login';
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 1000);
  }

  render() {
    return (
      <div className="landing-page">

        <Helmet> <style>{'body { background-color: #ffff;}'}</style> </Helmet>

        <div className="container">

          <div className="content-container">

            <h1 className="header">Frontend Challenge</h1>

            <button type="submit" onClick={(key) => { this.handleProcced(key); }}>Go With Us Now</button>

          </div>

        </div>

      </div>

    );
  }
}

export default Landing;
