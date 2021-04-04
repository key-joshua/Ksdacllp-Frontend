/* eslint-disable camelcase */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-one-expression-per-line */

import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faSearch, faAngleLeft, faAngleRight, faSyncAlt, faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import ViewForm from './viewForm';
import Navbar from '../navBar/navBar';
import SideBar from '../sideBar/SideBar';
import Loading from '../loading/loading';
import { viewUsers, removeUser } from '../../actions';
import { variables, shortData, verifyLogin } from '../../helpers';

const successTimeOut = variables.SUCCESS_TIMEOUT;
const errorTimeOut = variables.ERROR_TIMEOUT;

class VeiwUsers extends Component {
  constructor() {
    super();
    this.state = {
      result: false,
      inputStatus: true,
      showAddForm: false,

      data: [],
      user: {},
      filteredData: {},
      dataLoaded: true,

      keyword: '',
      searchedData: [],
      searchedDataLoaded: false,
    };
  }

  componentDidMount() {
    const { session, user } = verifyLogin();
    const { viewCurrentUsers } = this.props;

    this.setState({ result: true, user, data: [], dataLoaded: false, searchedData: [], searchedDataLoaded: false, keyword: '' });
    viewCurrentUsers(session, 1);
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.loadedData === true) {
      setTimeout(() => { this.setState({ result: false, inputStatus: false, data: props.data.data, dataLoaded: props.loadedData }); }, successTimeOut);
    }

    if (props.removeLoadedData === true) {
      toast.success(props.removeData.message);
      setTimeout(() => { window.location.reload(1); }, successTimeOut);
    }

    if (props.loadedData === false) {
      toast.error(props.data.message);
      setTimeout(() => { this.setState({ result: false }); }, errorTimeOut);
    }

    if (props.removeLoadedData === false) {
      toast.error(props.removeData.message);
      setTimeout(() => { this.setState({ result: false }); }, errorTimeOut);
    }
  }

  handlePreviouPage(key, page) {
    key.preventDefault();
    const { session } = verifyLogin();
    const { viewCurrentUsers } = this.props;
    this.setState({ result: true, keyword: '', searchedData: [], searchedDataLoaded: false });
    viewCurrentUsers(session, page);
  }

  handleNextPage(key, page) {
    key.preventDefault();
    const { session } = verifyLogin();
    const { viewCurrentUsers } = this.props;
    this.setState({ result: true, keyword: '', searchedData: [], searchedDataLoaded: false });
    viewCurrentUsers(session, page);
  }

  handleSearchBook(key) {
    key.preventDefault();
    const newData = [];
    const { keyword, data } = this.state;

    if (keyword.length < 1) {
      toast.error('Search keyword is required');
      return;
    }

    const filter = keyword.toLowerCase();
    this.setState({ result: true, searchedData: [], searchedDataLoaded: false });

    data.paginate.find((element) => {
      if (element.userName.toLowerCase().indexOf(filter) > -1) {
        newData.push(element);
        this.setState({ searchedData: [...newData], searchedDataLoaded: true });

        setTimeout(() => {
          this.setState({ result: false });
        }, successTimeOut);
      }
    });

    if (!data.paginate.find((element) => element.userName.toLowerCase().indexOf(filter) > -1)) {
      toast.error('Matching results not found');
      setTimeout(() => {
        this.setState({ result: false });
      }, errorTimeOut);
    }
  }

  handleDelete(key, id) {
    key.preventDefault();
    const { session } = verifyLogin();

    if (confirm('CONFIRM TO PROCCESSED )): User will removed permanently')) {
      const { removeCurrentUser } = this.props;

      this.setState({ result: true });
      removeCurrentUser(session, id);
    } else {
      this.setState({ result: false });
    }
  }

  handleShowAddForm(key, status, id) {
    key.preventDefault();
    const { data, filteredData } = this.state;

    if (status === 'edit') {
      const user = data.paginate.find((element) => element._id === id);

      this.setState({ filteredData: user, result: true });
      if (filteredData) { this.setState({ showAddForm: true }); }
      return;
    }

    if (status === 'add') {
      this.setState({ filteredData: {}, result: true });
      if (Object.keys(filteredData).length === 0) { this.setState({ showAddForm: true }); }
    }
  }

  handleHideAddForm(key) {
    key.preventDefault();
    this.setState({
      showAddForm: false,
      filteredData: {},
      result: false,
    });
  }

  handleChange(key) {
    key.preventDefault();
    this.setState({ [key.target.id]: key.target.value });
  }

  render() {
    const {
      result,
      keyword,
      showAddForm,

      data,
      user,
      dataLoaded,
      inputStatus,
      searchedData,
      searchedDataLoaded,
    } = this.state;

    return (
      <div className="data-page">

        <Helmet>
          <style>{'body { background-color: rgb(231, 230, 230); }'}</style>
        </Helmet>

        <ToastContainer />

        <Navbar MainProps={this.props} />

        {result === true ? <Loading MainProps={this.props} /> : null }

        {user ? <SideBar MainProps={{ props: this.props, user }} /> : null }

        <div className="main-container">

          <h1>USERS BY {user && user.userName ? user.userName.toUpperCase().split(' ').slice(-1).join(' ') : null}</h1>

          <div className="action-container">

            <div className="search-action">

              <input readOnly={inputStatus} type="text" placeholder="Search by name" id="keyword" value={keyword} onChange={(id) => this.handleChange(id)} />
              <FontAwesomeIcon icon={faSearch} className="icon" onClick={(key) => { this.handleSearchBook(key); }} />

            </div>

            <div className="reload-action">

              <FontAwesomeIcon icon={faSyncAlt} className="icon add-icon" onClick={(key) => { this.componentDidMount(key); }} />
              <label id="add">Reload Users</label>

              <FontAwesomeIcon icon={faPlus} className="icon reload-icon" onClick={(key) => { this.handleShowAddForm(key, 'add'); }} />
              <label id="reload">Add user</label>
            </div>

            <div className="paginate-action">
              {
                data.Previous
                  ? (<FontAwesomeIcon icon={faAngleLeft} className="paginate-angles" style={{ color: '#ac2323' }} onClick={(key) => { this.handlePreviouPage(key, data.Previous.page); }} />)
                  : (<FontAwesomeIcon icon={faAngleLeft} className="paginate-angles" style={{ color: '#6d6868' }} />)
              }

              {
                data.Next ? (<span className="paginate-page">{`0 ${data.Next.page - 1}`}</span>)
                  : data.Previous ? (<span className="paginate-page">{`0 ${data.Previous.page + 1}`}</span>)
                    : (<span className="paginate-page">01</span>)
              }

              {
                data.Next
                  ? (<FontAwesomeIcon icon={faAngleRight} className="paginate-angles" style={{ color: '#ac2323' }} onClick={(key) => { this.handleNextPage(key, data.Next.page); }} />)
                  : (<FontAwesomeIcon icon={faAngleRight} className="paginate-angles" style={{ color: '#6d6868' }} />)
              }

            </div>

          </div>

          <div className="table-container">

            {dataLoaded === true && data.paginate && data.paginate.length > 0
              ? (
                <table>

                  <tbody>

                    <tr>
                      <th style={{ width: '50px' }}> ID </th>
                      <th> Name </th>
                      <th> Email </th>
                      <th> Verified </th>
                      <th style={{ textAlign: 'center' }}> Action </th>
                    </tr>

                    { searchedDataLoaded === true && searchedData.length > 0
                      ? searchedData.map((element, index) => (
                        <tr key={element._id}>
                          <td>{index + 1}</td>
                          <td> {shortData(element.userName)} </td>
                          <td> {element.email} </td>
                          <td> {element.isVerified === true ? 'True' : 'False' } </td>
                          <td className="table-button">

                            { element.isVerified === false
                              ? (
                                <>
                                  <button type="button" className="update" onClick={(key) => { this.handleShowAddForm(key, 'edit', element._id); }}>
                                    <FontAwesomeIcon icon={faPencilAlt} className="icon" />
                                  </button>

                                  <button type="button" className="delete" onClick={(key) => { this.handleDelete(key, element._id); }}>
                                    <FontAwesomeIcon icon={faTrashAlt} className="icon" />
                                  </button>
                                </>
                              )
                              : null}

                          </td>
                        </tr>

                      ))
                      : data.paginate.map((element, index) => (
                        <tr key={element._id}>
                          <td>{index + 1}</td>
                          <td> {shortData(element.userName)} </td>
                          <td> {element.email} </td>
                          <td> {element.isVerified === true ? 'True' : 'False' } </td>
                          <td className="table-button">

                            { element.isVerified === false
                              ? (
                                <>
                                  <button type="button" className="update" onClick={(key) => { this.handleShowAddForm(key, 'edit', element._id); }}>
                                    <FontAwesomeIcon icon={faPencilAlt} className="icon" />
                                  </button>

                                  <button type="button" className="delete" onClick={(key) => { this.handleDelete(key, element._id); }}>
                                    <FontAwesomeIcon icon={faTrashAlt} className="icon" />
                                  </button>
                                </>
                              )
                              : null}

                          </td>
                        </tr>

                      ))}

                  </tbody>

                </table>
              )
              : null}

          </div>

          { showAddForm === true
            ? (
              <div className="form-container">

                <div className="form-header">
                  <h2>USER DETAILS
                    <span onClick={(key) => { this.handleHideAddForm(key); }}>
                      <FontAwesomeIcon icon={faTimes} className="icon" />
                    </span>
                  </h2>
                </div>

                <ViewForm MainProps={{ props: this.props, state: this.state }} />

              </div>
            )
            : null}

        </div>

      </div>
    );
  }
}

VeiwUsers.defaultProps = {
  loadedData: null,
  data: {},

  removeLoadedData: null,
  removeData: {},

  viewCurrentUsers: PropTypes.func,
  removeCurrentUser: PropTypes.func,
};

VeiwUsers.propTypes = {
  loadedData: PropTypes.bool,
  data: PropTypes.shape(),

  removeLoadedData: PropTypes.bool,
  removeData: PropTypes.shape(),

  viewCurrentUsers: PropTypes.func,
  removeCurrentUser: PropTypes.func,
};

const mapStateToProps = ({ viewUsersInitialState, removeUserInitialState }) => (
  {
    loadedData: viewUsersInitialState.loading,
    data: viewUsersInitialState.data,

    removeLoadedData: removeUserInitialState.loading,
    removeData: removeUserInitialState.data,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    viewCurrentUsers: (session, page) => {
      dispatch(viewUsers(session, page));
    },

    removeCurrentUser: (session, userId) => {
      dispatch(removeUser(session, userId));
    },

  });

export default connect(mapStateToProps, mapDispatchToProps)(VeiwUsers);
