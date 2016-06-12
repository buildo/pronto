import container from 'container';
import OpenToggle from './OpenToggle';
import loadingDecorator from 'noLoading';

export default container(OpenToggle, {
  queries: ['open'],
  loadingDecorator,
  commands: ['doOpen', 'doClose', 'doRefreshOpen'],
  mapProps: ({ open, doOpen, doClose, doRefreshOpen }) => ({
    open,
    onClick: open ? () => doClose() : () => doOpen(),
    refresh: () => doRefreshOpen()
  })
});