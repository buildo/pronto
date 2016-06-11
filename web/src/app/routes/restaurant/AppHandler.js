import React from 'react';
import { RouteHandler } from 'react-router';
import { View } from 'Basic';
import Navbar from 'restaurant/Navbar';

export default class AppHandler extends React.Component {
  render() {
    return (
      <View grow>
        <View column grow>
          <Navbar />
          <RouteHandler />
        </View>
      </View>
    );
  }
}
