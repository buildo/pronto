import React from 'react';
import t from 'tcomb';
import { props } from 'tcomb-react';
import { skinnable } from 'revenge';
import { FlexView } from 'Basic';
import { Restaurant } from 'model';

@skinnable()
@props({
  restaurants: t.list(Restaurant),
  onRestaurantClick: t.Function
})
export default class Restaurants extends React.Component {

  templateRestaurant = (onRestaurantClick) => (restaurant, key) => (
    <FlexView key={key} onClick={onRestaurantClick}>
      {restaurant.profile.name}
    </FlexView>
  )

  template({ restaurants, onRestaurantClick }) {
    return (
      <FlexView>
        {restaurants.map(this.templateRestaurant(onRestaurantClick))}
      </FlexView>
    );
  }
}
