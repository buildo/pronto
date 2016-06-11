import React from 'react';
import { skinnable } from 'revenge';
import { props, t } from 'tcomb-react';

@skinnable()
@props({
  onLoginClick: t.Function
})
export default class Login extends React.Component {
  template({ onLoginClick }) {
    return (
      <div style={{ padding: 10, textAlign: 'center' }}>
        <a onClick={onLoginClick}>login</a>
      </div>
    );
  }
}