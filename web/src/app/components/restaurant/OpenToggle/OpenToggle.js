import React from 'react';
import { View, Toggle, Poll } from 'Basic';
import { pure, skinnable } from 'revenge';

@pure
@skinnable()
export default class OpenToggle extends React.Component {
  getLocals({ open, onClick, refresh }) {
    return {
      labelProps: {
        children: open ? 'We are open!' : 'Sorry, we are closed',
        style: { margin: 10 }
      },
      toggleProps: {
        value: open,
        onChange: onClick
      },
      refresh
    };
  }

  template({ labelProps, toggleProps, refresh }) {
    return (
      <View vAlignContent='center'>
        <View {...labelProps} />
        <Toggle {...toggleProps} />
        <Poll interval={2000} callback={refresh} />
      </View>
    );
  }
}