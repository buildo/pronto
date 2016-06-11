import React from 'react';
import t from 'tcomb';
import { props } from 'tcomb-react';
import { skinnable } from 'revenge';
import { FlexView } from 'Basic';
import { Restaurant } from 'model';
import RestaurantCard from '../RestaurantCard/RestaurantCard';

@skinnable()
@props({
  restaurants: t.list(Restaurant),
  onRestaurantClick: t.Function
})
export default class Restaurants extends React.Component {

  template({ restaurants, onRestaurantClick }) {
    return (
      <FlexView>
        {restaurants.map((r, i) => (
          <RestaurantCard profile={r.profile} onClick={onRestaurantClick(r._id)} key={i} />
        ))}
      </FlexView>
    );
  }
}
