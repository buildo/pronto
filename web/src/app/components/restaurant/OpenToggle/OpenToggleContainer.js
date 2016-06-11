import container from 'container';
import OpenToggle from './OpenToggle';

export default container(OpenToggle, {
  queries: ['open'],
  commands: ['doOpen', 'doClose'],
  mapProps: ({ open, doOpen, doClose }) => ({
    open, onClick: open ? () => doClose() : () => doOpen()
  })
});