import t from 'tcomb';
import container from 'container';
import NavbarMenu from './NavbarMenu';

const items = ['orders', 'menu', 'profile'];

export default container(NavbarMenu, {
  connect: { view: t.String },
  mapProps: ({ view: activeView, transition }) => ({
    items: items.map(view => ({
      label: view.toUpperCase(),
      active: activeView === view,
      onClick: () => transition({ view })
    }))
  })
});