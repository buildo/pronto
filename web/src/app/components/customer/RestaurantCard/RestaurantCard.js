import React from 'react';
import cx from 'classnames';
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

  getLocals({ restaurant: { name, address, imgUrl, open }, onClick }) {
    return {
      name,
      address,
      imgUrl,
      open,
      onClick: open ? onClick : undefined,
      className: cx('restaurant-card', { 'is-disabled': !open })
    };
  }

  template({ name, imgUrl, address, onClick, className, open }) {
    return (
      <FlexView column className={className} onClick={onClick}>
        {!open && (
          <FlexView
            className='card-closed'
            hAlignContent='center'
            vAlignContent='center'
          >
            CHIUSO
          </FlexView>
       )}
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
