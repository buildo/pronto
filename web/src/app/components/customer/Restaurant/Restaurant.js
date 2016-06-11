import React from 'react';
import { props } from 'tcomb-react';
import { skinnable } from 'revenge';
import RightSidebar from 'customer/RightSidebar';
import { FlexView } from 'Basic';
import { Restaurant as RestaurantType } from 'model';

@skinnable()
@props({
  restaurant: RestaurantType
})
export default class Restaurant extends React.Component {

  template(/*{ restaurant }*/) {
    return (
      <FlexView className='restaurant' column>
        <FlexView>
          Header goes here...
        </FlexView>
        <FlexView hAlignContent='center'>
          <FlexView className='content' basis={900} grow={false}>
            <FlexView className='menu-container' grow>
              Menu goes here...
            </FlexView>
            <RightSidebar>
              Order goes here...
            </RightSidebar>
          </FlexView>
        </FlexView>
      </FlexView>
    );
  }
}
