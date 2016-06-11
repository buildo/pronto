import React from 'react';
import { View } from 'Basic';
import { pure, skinnable } from 'revenge';
import NavbarMenu from 'restaurant/NavbarMenu';
import OpenToggle from 'restaurant/OpenToggle';

@pure
@skinnable()
export default class Navbar extends React.Component {
  template() {
    return (
      <View grow basis={60} style={{ padding: 10 }}>
        <View grow hAlignContent='left' vAlignContent='center'>
          <NavbarMenu />
        </View>
        <View hAlignContent='right' vAlignContent='center'>
          <OpenToggle />
        </View>
      </View>
    );
  }
}
