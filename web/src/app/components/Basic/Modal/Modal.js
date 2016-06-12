import React from 'react';
import BRCModal from 'buildo-react-components/src/modal/Modal';

import './modal.scss';

export default class Modal extends React.Component {
  render = () => {
    return (
      <BRCModal
        dismissOnClickOutside
        transitionLeaveTimeout={0}
        transitionEnterTimeout={0}
        iconClose={<i className='fa fa-close' />}
        {...this.props}
      />
    );
  }
}
