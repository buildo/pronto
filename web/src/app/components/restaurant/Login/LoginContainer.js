import t from 'tcomb';
import Login from './Login';
import container from 'container';

export default container(Login, {
  connect: { token: t.maybe(t.String) },
  commands: ['doLogin'],
  mapProps: ({ transition, doLogin }) => ({
    onLoginClick: () => {
      doLogin().then(() => {
        transition({ token: localStorage.getItem('token') });
      });
    }
  })
});
