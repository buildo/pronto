import React from 'react';
import { props, t } from 'tcomb-react';
import { pure, skinnable } from 'revenge';
import { Restaurant } from 'model';
import FlexView from 'FlexView';

import './restaurantCard.scss';
import './img/location-icon.png';
import './img/time-icon.png';

@pure
@skinnable()
@props({
  restaurant: Restaurant,
  onClick: t.Function
})
export default class RestaurantCard extends React.Component {

  getLocals({ restaurant: { name, address, imgUrl }, onClick }) {
    // const [timeStart, timeEnd] = timeSlot;
    return { name, address, imgUrl, onClick };
  }

  template({ name, imgUrl, address, onClick }) {
    return (
      <FlexView column className='restaurant-card' onClick={onClick}>
        <div className='card-image' style={{ backgroundImage: `url(${imgUrl})` }} />
        <div className='description'>
          <div className='description-container'>
            <p className='name'>{name}</p>
            <i className='location-icon'></i> <p className='address'>{address}</p>
            {/* <i className='time-icon'></i>     <p className='time-slot'>12:30 - 14:55</p>*/}
          </div>
        </div>
      </FlexView>
    );
  }

}
