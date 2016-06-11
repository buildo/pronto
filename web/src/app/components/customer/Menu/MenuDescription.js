import React from 'react';
import { props, t } from 'tcomb-react';
import { pure, skinnable } from 'revenge';

@pure
@skinnable()
@props({
  description: t.String
})
export default class MenuDescription extends React.Component {

  template({ description }) {
    return (
      <div className='menu-description'>
        {description}
      </div>
    );
  }

}
