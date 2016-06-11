import React from 'react';
import { props, t } from 'tcomb-react';
import { pure, skinnable } from 'revenge';
import { FlexView } from 'Basic';
import { RestaurantProfile } from 'model';

import './restaurantCard.scss';
import './img/location-icon.png';
import './img/time-icon.png';

@pure
@skinnable()
@props({
  profile: RestaurantProfile,
  onClick: t.Function
})
export default class RestaurantCard extends React.Component {

  getLocals() {
    const { name, address, imageURL } = this.props.profile;
    const onClick = this.props.onClick;
    // const [timeStart, timeEnd] = timeSlot;
    return { name, address, imageURL, onClick };
  }

  template({ name, imageURL, address, onClick }) {
    return (
      <div className='restaurant-card' onClick={onClick}>
        <img src={imageURL} alt={name} />
        <div className='description'>
          <div className='description-container'>
            <p className='name'>{name}</p>
            <i className='location-icon'></i> <p className='address'>{address}</p>
            {/* <i className='time-icon'></i>     <p className='time-slot'>12:30 - 14:55</p>*/}
          </div>
        </div>
      </div>
    );
  }

}
