import React from 'react';
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
            Cart goes here...
          </RightSidebar>
        </View>
      </View>
    );
  }
}
