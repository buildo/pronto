import React from 'react';
import { FlexView } from 'Basic';
import { StickyContainer } from 'react-sticky';

import './page.scss';

export default class Page extends React.Component {
  render = () => (
    <StickyContainer>
      <FlexView className='page' column>
        {this.props.children}
      </FlexView>
    </StickyContainer>
  )
}
