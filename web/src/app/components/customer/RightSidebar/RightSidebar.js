import React from 'react';
import { FlexView } from 'Basic';

import './rightSidebar.scss';

export default class RightSidebar extends React.Component {
  render() {
    return (
      <FlexView className='right-sidebar' column basis={285}>
        {this.props.children}
      </FlexView>
    );
  }
}
