/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ImageUploader from 'react-images-upload';

import Pattern from './pattern';
import Loading from '../loading/loading';
import { addUser, editUser } from '../../actions';
import { variables, verifyLogin } from '../../helpers';

const errorTimeOut = variables.ERROR_TIMEOUT;
class ViewForm extends Component {
  constructor() {
    super();
    this.state = {
      result: false,

      buttonStatus: '',
      profilePicture: '',
      userName: '',
      email: '',
    };

    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    const { MainProps } = this.props;
    if (Object.keys(MainProps.state.filteredData).length > 0) {
      this.setState({
        buttonStatus: 'edit',
        profilePicture: MainProps.state.filteredData.profile,
        userName: MainProps.state.filteredData.userName,
        email: MainProps.state.filteredData.email
      });
    }
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.loadedAddUserData === true) {
      toast.success(props.addUserdata.message);
      setTimeout(() => { window.location.reload(1); }, errorTimeOut);
    }

    if (props.loadedEditUserData === true) {
      toast.success(props.editUserdata.message);
      setTimeout(() => { window.location.reload(1); }, errorTimeOut);
    }

    if (props.loadedAddUserData === false) {
      toast.error(props.addUserdata.message);
      setTimeout(() => { this.setState({ result: false }); }, errorTimeOut);
    }

    if (props.loadedEditUserData === false) {
      toast.error(props.editUserdata.message);
      setTimeout(() => { this.setState({ result: false }); }, errorTimeOut);
    }
  }

  handleChange(key) {
    key.preventDefault();
    this.setState({ [key.target.id]: key.target.value });
  }

  handleEditData(key) {
    key.preventDefault();
    const { session } = verifyLogin();
    const { MainProps, editCurrentUser } = this.props;
    const { profilePicture, userName, email } = this.state;
    if (typeof (profilePicture) === 'string' && MainProps.state.filteredData.userName === userName && MainProps.state.filteredData.email === email) { toast.error('Updates not found at the moment'); return; }

    this.setState({ result: true });
    editCurrentUser(session, MainProps.state.filteredData._id, this.state);
  }

  handleSaveData(key) {
    key.preventDefault();
    const { session } = verifyLogin();
    const { addCurrentUser } = this.props;
    const { profilePicture, userName, email } = this.state;
    if (!profilePicture.name || userName.length < 1 || email.length < 1) { toast.error('Form fields are required'); return; }

    this.setState({ result: true });
    addCurrentUser(session, this.state);
  }

  onDrop(picture) {
    this.setState({ profilePicture: picture[picture.length - 1] });
  }

  render() {
    const { result, buttonStatus, profilePicture, userName, email } = this.state;
    const { MainProps } = this.props;
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
      <form className="form">

        {result === true ? <Loading MainProps={MainProps.props} /> : null }

        <Pattern />
        <div className="picture-upload">

          <div className="profile-picture"> {profilePicture ? <img src={profilePicturePreview || profilePicture} alt="profile" /> : null} </div>
          <ImageUploader fileContainerStyle={{ marginTop: '30px', height: '50px', width: '210px' }} buttonStyles={{ backgroundColor: '#ac2323', color: '#ffff', fontSize: '12px' }} imgExtension={['.jpg', '.png', '.gif']} buttonText="Upload Profile" maxFileSize={100000000} onChange={this.onDrop} withIcon withLabel={false} />

        </div>

        <input type="username" id="userName" value={userName} placeholder="User Name" onChange={(id) => this.handleChange(id)} />
        <input type="email" id="email" value={email} placeholder="Email" onChange={(id) => this.handleChange(id)} />

        {
          buttonStatus === 'edit'
            ? <button type="button" onClick={(key) => { this.handleEditData(key); }}> EDIT USER </button>
            : <button type="button" onClick={(key) => { this.handleSaveData(key); }}> ADD USER </button>
        }

      </form>
    );
  }
}

ViewForm.defaultProps = {
  loadedAddUserData: null,
  addUserdata: {},

  loadedEditUserData: null,
  editUserdata: {},

  MainProps: {},
  addCurrentUser: PropTypes.func,
  editCurrentUser: PropTypes.func,
};

ViewForm.propTypes = {
  loadedAddUserData: PropTypes.bool,
  addUserdata: PropTypes.shape(),

  loadedEditUserData: PropTypes.bool,
  editUserdata: PropTypes.shape(),

  MainProps: PropTypes.shape(),
  addCurrentUser: PropTypes.func,
  editCurrentUser: PropTypes.func,
};

const mapStateToProps = ({ addUserInitialState, editUserInitialState }) => (
  {
    loadedAddUserData: addUserInitialState.loading,
    addUserdata: addUserInitialState.data,

    loadedEditUserData: editUserInitialState.loading,
    editUserdata: editUserInitialState.data,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    addCurrentUser: (session, state) => {
      dispatch(addUser(session, state));
    },

    editCurrentUser: (session, userId, state) => {
      dispatch(editUser(session, userId, state));
    },

  });

export default connect(mapStateToProps, mapDispatchToProps)(ViewForm);
