import React from 'react';
import { FlexView } from 'Basic';

export default class RightSidebar extends React.Component {
  render() {
    return (
      <FlexView className='right-sidear' column basis={300}>
        {this.props.children}
      </FlexView>
    );
  }
}
