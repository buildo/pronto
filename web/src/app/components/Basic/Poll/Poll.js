import React from 'react';
import { pure, skinnable } from 'revenge';
import { props, t } from 'tcomb-react';

@pure
@skinnable()
@props({
  interval: t.Integer,
  callback: t.Function
})
export default class Poll extends React.Component {
  componentWillMount() {
    this._interval = setInterval(this.props.callback, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  template() {
    return null;
  }
}