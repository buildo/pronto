import React from 'react';
import { Route } from 'react-router';
import App from '../AppHandler';
import Restaurants from './RestaurantsHandler';

export default (
  <Route path='/' handler={App}>
    <Route name='restaurants' handler={Restaurants} />
  </Route>
);
