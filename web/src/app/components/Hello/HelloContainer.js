import Hello from './Hello';
import t from 'tcomb';
import container from 'container';

const HelloContainer = container(Hello, {
  connect: { formal: t.maybe(t.Boolean) },
  queries: ['user'],
  commands: ['doRefreshUser', 'doLogout'],
  mapProps: ({ transition, formal = false, user, doRefreshUser, doLogout }) => ({
    toggle: () => {
      transition({ formal: !formal });
    },
    formal,
    user,
    onRefreshClick: () => doRefreshUser(),
    onLogoutClick: () => doLogout().then(() => {
      transition({ token: null });
    })
  })
});

export default HelloContainer;
