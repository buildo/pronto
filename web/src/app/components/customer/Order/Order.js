import React from 'react';
import { props } from 'tcomb-react';
import { skinnable } from 'revenge';
import { FlexView } from 'Basic';
import { Order as OrderType } from 'model';


@skinnable()
@props({
  order: OrderType
})
export default class Order extends React.Component {

  template(/*{ order }*/) {
    return (
      <FlexView className='order' column>
        Order goes here...
      </FlexView>
    );
  }
}
