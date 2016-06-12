import React from 'react';
import { skinnable, pure } from 'revenge';
import { props } from 'tcomb-react';
import { SubmittedOrder } from 'model';

@skinnable()
@pure
@props({
  order: SubmittedOrder
})
export default class Order extends React.Component {
  template({ order }) {
    return <div>{order.id} ({order.peopleOrders.length} people)</div>;
  }
}
