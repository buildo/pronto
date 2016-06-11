import React from 'react';
import Restaurant from 'customer/Restaurant';
import { FlexView as View } from 'Basic';
import RightSidebar from 'customer/RightSidebar';

// temp
const Cart = <div className='cart' />;

export default class RestaurantHandler extends React.Component {
  render() {
    return (
      <View>
        <Restaurant />
        <RightSidebar>
          <Cart />
        </RightSidebar>
      </View>
    );
  }
}
