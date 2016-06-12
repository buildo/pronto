import React from 'react';
import { props, t } from 'tcomb-react';
import { pure, skinnable } from 'revenge';
import FlexView from 'FlexView';

import './header.scss';
import './img/logo.png';

@pure
@skinnable()
@props({
  /*
  title: t.String,
  subtitle: t.String,
  imgURL: t.String
  */
})
export default class Header extends React.Component {
  template({ title, subtitle, imgURL }) {
    title = 'ACCOMODATI IL TUO PIATTO TI ASPETTA';
    subtitle = 'We are cooking up something great for you.';
    imgURL = 'https://volo-images.s3.amazonaws.com/production/it/s3qv-hero.jpg?3';
    return (
      <FlexView className='header'style={{ backgroundImage: `url(${imgURL})` }}>
        <FlexView className='header-overlay' column hAlignContent='center' vAlignContent='top' grow>
          <FlexView className='header-container header-container-logo' column hAlignContent='left' vAlignContent='top'>
            <span className="logo"></span>
          </FlexView>
          <FlexView className='header-container' column hAlignContent='center' vAlignContent='center' grow>
            <h1 className="header-title">{title}</h1>
            <p className='header-subtitle'>{subtitle}</p>
          </FlexView>
        </FlexView>
      </FlexView>
    );
  }
}