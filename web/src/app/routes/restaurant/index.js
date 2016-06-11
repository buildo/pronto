import React from 'react';
import { Route } from 'react-router';
import App from './AppHandler';
import Orders from './OrdersHandler';
import Profile from './ProfileHandler';
import Menu from './MenuHandler';
import Login from './LoginHandler';

export default (
  <Route path='/' handler={App}>
    <Route name='orders' handler={Orders} />
    <Route name='profile' handler={Profile} />
    <Route name='menu' handler={Menu} />
    <Route name='login' handler={Login} />
  </Route>
);
