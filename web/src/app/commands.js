import { Command } from 'avenger';
import t from 'tcomb';
import { user, open, restaurantProfile, menu, order } from 'queries';
import * as API from 'API';
import { Menu, Order } from 'model';
import findIndex from 'lodash/findIndex';

export const doRefreshUser = Command({
  id: 'doRefreshUser',
  invalidates: { user },
  run: ::Promise.resolve
});

export const doLogin = Command({
  id: 'doLogin',
  run: () => {
    localStorage.setItem('token', String(Date.now()));
    return Promise.resolve();
  }
});

export const doLogout = Command({
  id: 'doLogout',
  run: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  }
});

export const doDeletePersonFromOrder = Command({
  id: 'doDeletePersonFromOrder',
  params: {
    restaurantId: t.String,
    orderId: t.String,
    order: Order,
    personId: t.String
  },
  invalidates: { order },
  run: ({ restaurantId, orderId, order, personId }) => {
    const personIndex = findIndex(order.peopleOrders, { name: personId });
    const peopleOrders = order.peopleOrders || [];
    return API.replacePeopleOrdersInRestaurantOrder(
      restaurantId,
      orderId,
      peopleOrders.slice(0, personIndex).concat(peopleOrders.slice(personIndex + 1))
    );
  }
});

export const doAddPersonToOrder = Command({
  id: 'doAddPersonToOrder',
  run: () => Promise.resolve()
});

export const doOpen = Command({
  id: 'doOpen',
  invalidates: { open },
  run: () => API.openRestaurant(0)
});

export const doClose = Command({
  id: 'doClose',
  invalidates: { open },
  run: () => API.closeRestaurant(0)
});

export const doRefreshOpen = Command({
  id: 'doRefreshOpen',
  invalidates: { open },
  run: ::Promise.resolve
});

export const updateRestaurantProfile = Command({
  id: 'updateRestaurantProfile',
  invalidates: { restaurantProfile },
  params: { profile: t.Object },
  run: ({ profile }) => API.updateRestaurant(0, profile)
});

export const doUpdateMenu = Command({
  id: 'doUpdateMenu',
  invalidates: { menu },
  params: { restaurantId: t.String, menu: Menu },
  run: ({ restaurantId, menu }) => API.updateMenu(restaurantId, menu)
});

export const doConfirmOrder = Command({
  id: 'doConfirmOrder',
  params: {
    restaurantId: t.String,
    orderId: t.String,
    customerPhoneNumber: t.String,
    tableName: t.String
  },
  run: ({ restaurantId: rId, orderId: oId, customerPhoneNumber, tableName }) => (
    API.patchOrder(rId, oId, { customerPhoneNumber, tableName, status: 'submitted' })
  )
});
