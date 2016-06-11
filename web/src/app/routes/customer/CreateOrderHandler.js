import React from 'react';
import CreateOrder from 'customer/CreateOrder';
import RightSidebar from 'customer/RightSidebar';

export default class CreateOrderHandler extends React.Component {
  render() {
    return (
      <RightSidebar>
        <CreateOrder />
      </RightSidebar>
    );
  }
}
