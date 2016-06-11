import React from 'react';
import Order from 'customer/Order';
import RightSidebar from 'customer/RightSidebar';

export default class OrderHandler extends React.Component {
  render() {
    return (
      <RightSidebar>
        <Order />
      </RightSidebar>
    );
  }
}
