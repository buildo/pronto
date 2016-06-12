import React from 'react';
import { props, t } from 'tcomb-react';
import { pure, skinnable } from 'revenge';
import FlexView from 'FlexView';

import './header.scss';

const imgURL = 'https://placehold.it/1200x1200';

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
    title = 'Almost Pronto!';
    subtitle = 'We are cooking up something great for you.';
    imgURL = 'https://placehold.it/1200x1200';
    return (
      <FlexView className='header'>
        <img src={imgURL} alt='' className="headerImage" />
        <h1 className="header-title">{title}</h1>
        <p className='header-subtitle'>{subtitle}</p>
      </FlexView>
    );
  }
}
