import t from 'tcomb';
import Login from './Login';
import container from 'react-container';
import allCommands from 'commands';

export default container({ allCommands })(Login, {
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
