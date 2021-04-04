import '../App.scss';
import ReactGa from 'react-ga';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Landing, Login, ResetPassword, VeiwUsers, ViewProfile, VerifyAccount, ResendVerification } from './index';

const Routes = () => {
  useEffect(() => {
    ReactGa.initialize('UA-163119480-1');
    ReactGa.pageview(window.location.pathname);
  }, []);
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/users" component={VeiwUsers} />
          <Route exact path="/profile" component={ViewProfile} />
          <Route exact path="/reset-user-password/:session" component={ResetPassword} />
          <Route exact path="/verify-user-account/:session" component={VerifyAccount} />
          <Route exact path="/resend-verification-link/:status" component={ResendVerification} />
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
