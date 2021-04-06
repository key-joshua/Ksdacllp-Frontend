/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/react-in-jsx-scope */

import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../store';
import { Login } from '../components';

describe('<Login />', () => {
  test('it should render Login', () => {
    render(<Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>);

    expect(document.getElementsByClassName('login-header').length).not.toBeNull();
    expect(document.getElementsByTagName('login-form').length).not.toBeNull();
    expect(document.getElementsByTagName('button').length).not.toBeNull();
  });
});
