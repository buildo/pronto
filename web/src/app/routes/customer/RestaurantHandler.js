import React from 'react';
import { RouteHandler } from 'react-router';
import { FlexView as View } from 'Basic';
import RightSidebar from 'customer/RightSidebar';
import StaticMenu from 'customer/StaticMenu';

export default class RestaurantHandler extends React.Component {
  render() {
    return (
      <View column>
        <div>
          Header goes here...
        </div>
        <View>
          <StaticMenu />
          <RightSidebar>
            <RouteHandler />
          </RightSidebar>
        </View>
      </View>
    );
  }
}
