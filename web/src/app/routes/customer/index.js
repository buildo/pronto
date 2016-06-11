import React from 'react';
import { DefaultRoute, Route } from 'react-router';
import App from '../AppHandler';
import Restaurants from './RestaurantsHandler';
import Restaurant from './RestaurantHandler';
import Order from './OrderHandler';
import PersonOrder from './PersonOrderHandler';
import CreateOrder from './CreateOrderHandler';

export default (
  <Route path='/' handler={App}>
    <Route name='restaurants'>
      <Route name='restaurant' path='/restaurants/:restaurantId/?' handler={Restaurant}>
        <Route name='order' path=':orderId/?' handler={Order} />
        <Route name='personOrder' path=':orderId/:personId/?' handler={PersonOrder} />
        <DefaultRoute handler={CreateOrder} />
      </Route>
      <DefaultRoute  handler={Restaurants} />
    </Route>
  </Route>
);
