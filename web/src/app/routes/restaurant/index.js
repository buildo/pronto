import React from 'react';
import { Route } from 'react-router';
import App from '../AppHandler';
import Orders from './OrdersHandler';
import Login from './LoginHandler';

export default (
  <Route path='/' handler={App}>
    <Route name='orders' handler={Orders} />
    <Route name='login' handler={Login} />
  </Route>
);
