import React from 'react';
import t from 'tcomb';
import { props } from 'tcomb-react';
import { skinnable } from 'revenge';

@skinnable()
@props({
  onCreateOrderClick: t.Function
})
export default class CreateOrder extends React.Component {
  template({ onCreateOrderClick }) {
    return (
      <button onClick={onCreateOrderClick}>
        Create order
      </button>
    );
  }
}
