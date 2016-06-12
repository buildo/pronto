import React from 'react';
import t from 'tcomb';
import { props } from 'tcomb-react';
import { skinnable } from 'revenge';
import FlexView from 'FlexView';

import './createOrder.scss';

@skinnable()
@props({
  onCreateOrderClick: t.Function
})
export default class CreateOrder extends React.Component {
  template({ onCreateOrderClick }) {
    return (
      <FlexView column className='create-order'>
        <h1>pronto per ordinare?</h1>
        <p>
          Dopo che avrai effettuato l’ordine <b>entro 15 minuti</b> il tavolo sarà pronto!
        </p>
        <button className='primary' onClick={onCreateOrderClick}>
          Create order
        </button>
      </FlexView>
    );
  }
}
