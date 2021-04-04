/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */

import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ImageUploader from 'react-images-upload';
import { ToastContainer, toast } from 'react-toastify';

import Pattern from './pattern';
import Navbar from '../navBar/navBar';
import SideBar from '../sideBar/SideBar';
import Loading from '../loading/loading';
import { editProfile } from '../../actions';
import { variables, verifyLogin } from '../../helpers';

const successTimeOut = variables.SUCCESS_TIMEOUT;
const errorTimeOut = variables.ERROR_TIMEOUT;

class ViewProfile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      data: {},
      result: false,

      dataLoaded: false,
      buttonStatus: true,

      profilePicture: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    const { user } = verifyLogin();
    this.setState({
      result: true,
      dataLoaded: true,
      buttonStatus: false,

      user,
      email: user.email,
      userName: user.userName,
    });

    setTimeout(() => { this.setState({ result: false }); }, successTimeOut);
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.loadedData === true) {
      toast.success(props.data.message);
      localStorage.setItem('data', JSON.stringify(props.data.data));
      this.setState({ dataLoaded: true, buttonStatus: false, user: props.data.data.user, email: props.data.data.user.email, userName: props.data.data.user.userName, profilePicture: '', password: '', confirmPassword: '' });

      setTimeout(() => { this.setState({ result: false }); }, successTimeOut);
    }

    if (props.loadedData === false) {
      toast.error(props.data.message);
      setTimeout(() => { this.setState({ result: false }); }, errorTimeOut);
    }
  }

  handleChange(key) {
    key.preventDefault();
    this.setState({ [key.target.id]: key.target.value });
  }

  handleUpdate(key) {
    key.preventDefault();
    const { session, user } = verifyLogin();
    const { editCurrentProfile } = this.props;
    const { profilePicture, userName, email, password, confirmPassword } = this.state;
    if ((userName === user.userName && email === user.email) && !profilePicture && password.length < 1 && confirmPassword.length < 1) { toast.error('Updates not found at the moment'); return; }
    if (password.length > 0 && confirmPassword.length < 1) { toast.error('Confirm password is required'); return; }

    this.setState({ result: true });
    editCurrentProfile(session, this.state);
  }

  onDrop(picture) {
    this.setState({ profilePicture: picture[picture.length - 1] });
  }

  render() {
    const { result, user, dataLoaded, buttonStatus, profilePicture, userName, email, password, confirmPassword } = this.state;
    let profilePicturePreview = null;

    if (profilePicture) {
      if (profilePicture.name) {
        const getDocName = profilePicture.name;
        const docLength = getDocName.length;
        const point = getDocName.lastIndexOf('.');
        const getExtensionFile = getDocName.substring(point, docLength);
        const lowCaseExtensionFile = getExtensionFile.toLowerCase();
        if (lowCaseExtensionFile === '.jpg' || lowCaseExtensionFile === '.png' || lowCaseExtensionFile === '.gif') {
          profilePicturePreview = URL.createObjectURL(profilePicture);
        }
      }
    }

    return (

      <div>

        <Helmet> <style>{'body { background-color: rgb(231, 230, 230); }'}</style> </Helmet>

        <ToastContainer />

        <Navbar MainProps={this.props} />

        {result === true ? <Loading MainProps={this.props} /> : null }

        {dataLoaded === true && user ? <SideBar MainProps={{ props: this.props, user }} /> : null }

        <div className="main-container">

          <h1>{dataLoaded === true && user && user.userName ? user.userName.toUpperCase().split(' ').slice(-1).join(' ') : null} PROFILE</h1>

          <Pattern />

          <div className="main-container">

            <div className="view-container">

              <section className="section-one">

                <div className="profile-picture">{dataLoaded === true && user ? <img src={profilePicturePreview || user.profile} alt="profile" /> : null} </div>
                <ImageUploader fileContainerStyle={{ marginTop: '40px', height: '50px', width: '210px', float: 'left' }} buttonStyles={{ backgroundColor: '#ac2323', color: '#ffff' }} imgExtension={['.jpg', '.png', '.gif']} buttonText="Upload Profile" maxFileSize={100000000} onChange={this.onDrop} withIcon withLabel={false} />

              </section>

              <section className="section-two">

                <form className="form-container">
                  <div className="attribute-container">

                    <input type="username" id="userName" defaultValue={userName} placeholder="User Name" onChange={(id) => this.handleChange(id)} />
                    <input type="email" id="email" defaultValue={email} placeholder="User Email" onChange={(id) => this.handleChange(id)} />
                    <input type="password" id="password" defaultValue={password} placeholder="New Password" onChange={(id) => this.handleChange(id)} />
                    <input type="password" id="confirmPassword" defaultValue={confirmPassword} placeholder=" Confirm New Password" onChange={(id) => this.handleChange(id)} />

                    <span> {result === true ? <Loading MainProps={this.props} Case /> : null } </span>

                    <button disabled={buttonStatus} type="button" onClick={(key) => { this.handleUpdate(key); }}> UPDATE </button>

                  </div>
                </form>

              </section>

            </div>

          </div>

        </div>

      </div>

    );
  }
}

ViewProfile.defaultProps = {
  loadedData: null,
  data: {},

  editCurrentProfile: PropTypes.func,
};

ViewProfile.propTypes = {
  loadedData: PropTypes.bool,
  data: PropTypes.shape(),

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

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
