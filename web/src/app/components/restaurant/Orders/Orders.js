import React from 'react';
import { skinnable, pure } from 'revenge';
import { t, props } from 'tcomb-react';
import { SubmittedOrder } from 'model';

@skinnable()
@pure
@props({
  orders: t.list(SubmittedOrder)
})
export default class Orders extends React.Component {
  templateOrder = order => (
    <div key={order.id}>{order.id} ({order.peopleOrders.length} people)</div>
  );

  template({ orders }) {
    return (
      <div>
        {orders.map(this.templateOrder)}
      </div>
    );
  }
}
