import React from 'react';
import { FlexView } from 'Basic';

import './content.scss';

export default class Content extends React.Component {
  render = () => (
    <FlexView className='content' width='100%' hAlignContent='center'>
      {this.props.children}
    </FlexView>
  )
}
