import React from 'react';
import { RouteHandler } from 'react-router';
import Restaurant from 'customer/Restaurant';
import { FlexView as View } from 'Basic';
import RightSidebar from 'customer/RightSidebar';

export default class RestaurantHandler extends React.Component {
  render() {
    return (
      <View>
        <Restaurant />
        <RightSidebar>
          <RouteHandler />
        </RightSidebar>
      </View>
    );
  }
}
