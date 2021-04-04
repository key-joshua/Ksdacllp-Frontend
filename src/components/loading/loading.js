/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

class Loading extends Component {
  render() {
    if (this.props.MainProps.match.path === '/login'
    && this.props.Case === true) {
      return (
        <div>
          <Loader
            type="ThreeDots"
            color="#ac2323"
            height={20}
            width={40}
          />
        </div>
      );
    }

    return (
      <div className="main-loading">
        <Loader
          type="ThreeDots"
          color="#e5baba"
          height={50}
          width={100}
        />
      </div>
    );
  }
}

export default Loading;
