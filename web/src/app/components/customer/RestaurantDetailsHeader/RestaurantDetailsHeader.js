import React from 'react';
import { props } from 'tcomb-react';
import { pure, skinnable } from 'revenge';
import { Restaurant } from 'model';
import FlexView from 'FlexView';

import './RestaurantDetailsHeader.scss';
import './img/location-icon.png';
import './img/time-icon.png';

@pure
@skinnable()
@props({
  restaurant: Restaurant
})
export default class RestaurantDetailsHeader extends React.Component {

  getLocals({ restaurant: { address, telephone } }) {
    return { address, telephone };
  }

  template({ address, telephone }) {
    return (
      <FlexView className='restaurant-details-header' hAlignContent='center' vAlignContent='center'>
        <FlexView className='detail'>
          <i className='phone-icon'></i>
          <p className='address'>TELEFONO: {telephone}</p>
        </FlexView>
        <FlexView className='detail'>
          <i className='location-icon'></i>
          <p className='address'>INDIRIZZO: {address}</p>
        </FlexView>
        {/*<FlexView className='detail'>
          <i className='time-icon'></i>
          <p className='address'>FASCIA ORARIA: {timeStart} - {timeEnd}</p>
        </FlexView>*/}
      </FlexView>
    );
  }

}
