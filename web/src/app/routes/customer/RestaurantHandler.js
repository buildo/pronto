import React from 'react';
import { RouteHandler } from 'react-router';
import { FlexView as View } from 'Basic';
import RightSidebar from 'customer/RightSidebar';
import Menu from 'customer/Menu';

export default class RestaurantHandler extends React.Component {
  render() {
    return (
      <View column>
        <div>
          Header goes here...
        </div>
        <View>
          <Menu />
          <RightSidebar>
            <RouteHandler />
          </RightSidebar>
        </View>
      </View>
    );
  }
}
