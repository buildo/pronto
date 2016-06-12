import React from 'react';
import { skinnable, pure } from 'revenge';
import { t, props } from 'tcomb-react';
import { SubmittedOrder } from 'model';
import Order from './Order';
import ExpandedOrder from './ExpandedOrder';

@skinnable()
@pure
@props({
  restaurantOrders: t.list(SubmittedOrder),
  selectedOrderId: t.maybe(t.String)
})
export default class Orders extends React.Component {

  templateOrder = ({ order, expanded }) => expanded ?
    <ExpandedOrder key={order.id} order={order} /> :
    <Order key={order.id} order={order} />;

  template({ restaurantOrders, selectedOrderId }) {
    return (
      <div>
        {restaurantOrders.map(
          order => this.templateOrder({ order, expanded: selectedOrderId === order.id })
        )}
      </div>
    );
  }
}
