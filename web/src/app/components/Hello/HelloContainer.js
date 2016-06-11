import React from 'react';
import Hello from './Hello';
import t from 'tcomb';
import container from 'container';
import loading from 'react-avenger/loading';
import LoadingSpinner from 'buildo-react-components/src/loading-spinner';
import 'buildo-react-components/src/loading-spinner/style.scss';

const loadingDecorator = loading({
  wrapper: <div style={{ textAlign: 'center', position: 'relative', minHeight: 100 }} />,
  loader: <LoadingSpinner size='medium' />
});

const HelloContainer = container(Hello, {
  connect: { formal: t.maybe(t.Boolean) },
  queries: ['user'],
  commands: ['doRefreshUser', 'doLogout'],
  loadingDecorator,
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
