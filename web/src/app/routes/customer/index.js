import React from 'react';
import { DefaultRoute, Route } from 'react-router';
import App from '../AppHandler';
import Restaurants from './RestaurantsHandler';
import Restaurant from './RestaurantHandler';

export default (
  <Route path='/' handler={App}>
    <Route name='restaurants'>
      <Route name='restaurant' path='/restaurants/:restaurantId/?' handler={Restaurant} />
      <DefaultRoute  handler={Restaurants} />
    </Route>
  </Route>
);
