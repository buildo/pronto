import React from 'react';
import { FlexView } from 'Basic';

import './footer.scss';

export default class Footer extends React.Component {
  render = () => (
    <FlexView className='footer' hAlignContent='center'>
      PRONTO! -- P.IVA: IT432342394423423 - via San Malaga, 4  - 20143 - Milano, Italy
    </FlexView>
  )
}
