import React from 'react';
import { props, t } from 'tcomb-react';
import { pure, skinnable } from 'revenge';
import FlexView from 'Basic';

import './restaurantCard.scss';

@pure
@skinnable()
@props({
  //imageURL: t.String,
  //name: t.String,
  //timeSlot t.Array,
  //address: t.String,
  //onClick: t.Function,
})
export default class RestaurantCard extends React.Component {

  getLocals() {
    const {name, imageURL, address, onClick, timeSlot = []} = this.props;
    const [timeStart, timeEnd] = timeSlot;
    return {name, imageURL, address, onClick, timeStart, timeEnd};
  }

  template({name, imageURL, address, onClick, timeStart, timeEnd}) {
    return (
      <FlexView column vAlignContent='center' className='restaurant-card' onClick={onClick}>
        <div>
          <img src={imageURL} alt={name} />
          <p className='time-slot'>{timeStart} - {timeEnd}</p>
          <div className='description'>
            <p className='name'></p>
            <p className='address'></p>
          </div>
        </div>
      </FlexView>
    );
  }

}
