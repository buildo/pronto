import { Command } from 'avenger';
import queries from 'queries';

const commands = {

  doRefreshUser: Command({
    id: 'doRefreshUser',
    invalidates: { user: queries.user },
    run: ::Promise.resolve
  }),

  doLogin: Command({
    id: 'doLogin',
    run: () => {
      localStorage.setItem('token', String(Date.now()));
      return Promise.resolve();
    }
  }),

  doLogout: Command({
    id: 'doLogout',
    run: () => {
      localStorage.removeItem('token');
      return Promise.resolve();
    }
  })

};

export default commands;
