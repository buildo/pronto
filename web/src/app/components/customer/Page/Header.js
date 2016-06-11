import React from 'react';
import { FlexView } from 'Basic';

import './header.scss';

export default class Header extends React.Component {
  render = () => (
    <FlexView className='header'>
      {this.props.children}
    </FlexView>
  )
}
