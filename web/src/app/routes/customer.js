import React from 'react';
import { Route } from 'react-router';
import App from 'AppHandler';
import Hello from 'HelloHandler';

export default (
  <Route path='/' handler={App}>
    <Route name='hello' handler={Hello} />
  </Route>
);
