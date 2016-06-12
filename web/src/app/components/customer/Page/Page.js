import React from 'react';
import { FlexView } from 'Basic';

import './page.scss';

export default class Page extends React.Component {
  render = () => (
    <FlexView className='page' column>
      {this.props.children}
    </FlexView>
  )
}
