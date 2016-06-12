import React from 'react';
import { props, t } from 'tcomb-react';
import { pure, skinnable } from 'revenge';
import FlexView from 'FlexView';

import './header.scss';
import './img/logo.png';

@pure
@skinnable()
@props({
  title: t.String,
  subtitle: t.String,
  imgUrl: t.String
})
export default class Header extends React.Component {
  template({ title, subtitle, imgUrl }) {
    return (
      <FlexView className='header'style={{ backgroundImage: `url(${imgUrl})` }}>
        <FlexView className='header-overlay' column hAlignContent='center' vAlignContent='top' grow>
          <FlexView
            className='header-container header-container-logo'
            column
            hAlignContent='left'
            vAlignContent='top'
          >
            <span className='logo' />
          </FlexView>
          <FlexView
            className='header-container'
            column
            hAlignContent='center'
            vAlignContent='center'
            grow
          >
            <h1 className='header-title'>{title}</h1>
            <p className='header-subtitle'>{subtitle}</p>
          </FlexView>
        </FlexView>
      </FlexView>
    );
  }
}
