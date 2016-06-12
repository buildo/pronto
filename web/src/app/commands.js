import { Command } from 'avenger';
import t from 'tcomb';
import { openRestaurant, closeRestaurant, updateRestaurant, patchOrder } from 'API';
import { user, open, restaurantProfile } from 'queries';

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
  run: () => Promise.resolve()
});

export const doAddPersonToOrder = Command({
  id: 'doAddPersonToOrder',
  run: () => Promise.resolve()
});

export const doOpen = Command({
  id: 'doOpen',
  invalidates: { open },
  run: () => openRestaurant(0)
});

export const doClose = Command({
  id: 'doClose',
  invalidates: { open },
  run: () => closeRestaurant(0)
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
  run: ({ profile }) => updateRestaurant(0, profile)
});

export const doConfirmOrder = Command({
  id: 'doConfirmOrder',
  invalidates: {},
  params: { restaurantId: t.String, orderId: t.String },
  run: ({ restaurantId: rId, orderId: oId, customerPhoneNumber, tableName }) => (
    patchOrder(rId, oId, { customerPhoneNumber, tableName, status: 'submitted' })
  )
});
