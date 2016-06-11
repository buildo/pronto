import React from 'react';
import PersonOrder from 'customer/PersonOrder';
import RightSidebar from 'customer/RightSidebar';

export default class PersonOrderHandler extends React.Component {
  render() {
    return (
      <RightSidebar>
        <PersonOrder />
      </RightSidebar>
    );
  }
}
