import container from 'container';
import loadingDecorator from 'loading';
import StaticMenu from './StaticMenu';

export default container(StaticMenu, {
  connect: { },
  loadingDecorator,
  queries: ['menu']
});
