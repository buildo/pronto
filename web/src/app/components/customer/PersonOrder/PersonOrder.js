import React from 'react';
import t from 'tcomb';
import { props } from 'tcomb-react';
import { skinnable } from 'revenge';
import { FlexView, Poll } from 'Basic';
import OrderDetails from 'customer/OrderDetails';

@skinnable()
@props({
  initPersonItems: t.Function,
  personItems: t.list(t.String),
  personId: t.maybe(t.String),
  onCancel: t.Function,
  onConfirm: t.Function,
  refresh: t.Function
})
export default class PersonOrder extends React.Component {

  componentWillMount() {
    this.props.initPersonItems();
  }

  getLocals({ personItems, personId, onCancel, onConfirm, refresh }) {
    const person = personId && { name: personId, items: personItems };
    return {
      onCancel,
      onConfirm: personItems.length ? onConfirm : undefined,
      orderDetailsProps: {
        people: person ? [person] : []
      },
      refresh
    };
  }

  template({ orderDetailsProps, onCancel, onConfirm, refresh }) {
    return (
      <FlexView className='order' grow column>
        <Poll interval={3000} callback={refresh} />
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
