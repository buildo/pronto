import { Command } from 'avenger';
import t from 'tcomb';
import { user, open, restaurantProfile, menu, order } from 'queries';
import * as API from 'API';
import { Menu } from 'model';

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
    personId: t.String
  },
  invalidates: { order },
  run: ({ restaurantId, orderId, personId }) => API.deletePersonOrderInRestaurantOrder(
    restaurantId,
    orderId,
    personId
  )
});

export const doAddPersonToOrder = Command({
  id: 'doAddPersonToOrder',
  params: {
    restaurantId: t.String,
    orderId: t.String,
    personId: t.String,
    personItems: t.list(t.String)
  },
  invalidates: { order },
  run: ({
    restaurantId, orderId, personId: name, personItems: items
  }) => {
    if (items.length > 0) {
      return API.putPerson(restaurantId, orderId, { [name]: { items } });
    } else {
      return Promise.resolve();
    }
  }
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

export const doAddOrder = Command({
  id: 'doAddOrder',
  params: {
    restaurantId: t.String,
    orderId: t.String
  },
  run: ({ restaurantId, orderId }) => (
    API.putOrder(restaurantId, orderId, { status: 'pending' })
  )
});
