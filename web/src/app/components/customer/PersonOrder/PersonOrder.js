import React from 'react';
import t from 'tcomb';
import { props } from 'tcomb-react';
import { skinnable } from 'revenge';
import { FlexView } from 'Basic';
import OrderDetails from 'customer/OrderDetails';

@skinnable()
@props({
  personItems: t.list(t.String),
  personId: t.String,
  onCancel: t.Function,
  onConfirm: t.Function
})
export default class PersonOrder extends React.Component {

  getLocals({ personItems, personId, onCancel, onConfirm }) {
    return {
      onCancel,
      onConfirm,
      orderDetailsProps: {
        people: [{ name: personId, items: personItems }]
      }
    };
  }

  template({ orderDetailsProps, onCancel, onConfirm }) {
    return (
      <FlexView className='order' grow column>
        <OrderDetails {...orderDetailsProps} />
        <button onClick={onCancel}>
          Annulla
        </button>
        <button className='primary' onClick={onConfirm}>
          Aggiungi ordine
        </button>
      </FlexView>
    );
  }
}
