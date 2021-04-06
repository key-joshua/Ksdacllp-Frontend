/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/react-in-jsx-scope */

import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../store';
import navbar from '../components/navBar/navBar';

describe('<Login />', () => {
  test('it should render Login', () => {
    render(<Provider store={store}>
      <Router>
        <navbar />
      </Router>
    </Provider>);

    expect(document.getElementsByClassName('navbar-page').length).not.toBeNull();
    expect(document.getElementsByClassName('logo-page').length).not.toBeNull();
    expect(document.getElementsByClassName('nav-links').length).not.toBeNull();
  });
});
