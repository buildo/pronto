import { Command } from 'avenger';
import { user, open } from 'queries';

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
  run: () => {
    localStorage.setItem('open', true);
    return Promise.resolve();
  }
});

export const doClose = Command({
  id: 'doClose',
  invalidates: { open },
  run: () => {
    localStorage.setItem('open', false);
    return Promise.resolve();
  }
});
