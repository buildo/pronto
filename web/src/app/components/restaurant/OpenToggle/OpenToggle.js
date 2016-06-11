import React from 'react';
import { View, Toggle } from 'Basic';
import { pure, skinnable } from 'revenge';

@pure
@skinnable()
export default class OpenToggle extends React.Component {
  getLocals({ open, onClick }) {
    return {
      labelProps: {
        children: open ? 'We are open!' : 'Sorry, we are closed',
        style: { margin: 10 }
      },
      toggleProps: {
        value: open,
        onChange: onClick
      }
    };
  }

  template({ labelProps, toggleProps }) {
    return (
      <View vAlignContent='center'>
        <View {...labelProps} />
        <Toggle {...toggleProps} />
      </View>
    );
  }
}