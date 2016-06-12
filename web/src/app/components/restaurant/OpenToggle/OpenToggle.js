import React from 'react';
import { View, Toggle, Poll } from 'Basic';
import { pure, skinnable } from 'revenge';

const wrapperStyle = { cursor: 'pointer' };

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
        value: open
      },
      refresh,
      onClick
    };
  }

  template({ labelProps, toggleProps, refresh, onClick }) {
    return (
      <View vAlignContent='center' onClick={onClick} style={wrapperStyle}>
        <View {...labelProps} />
        <Toggle {...toggleProps} />
        <Poll interval={2000} callback={refresh} />
      </View>
    );
  }
}