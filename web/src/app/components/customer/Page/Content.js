import React from 'react';
import { FlexView } from 'Basic';

import './content.scss';

export default class Content extends React.Component {
  render = () => (
    <FlexView className='content' grow hAlignContent='center'>
      <FlexView basis={890} shrink>
        {this.props.children}
      </FlexView>
    </FlexView>
  )
}
