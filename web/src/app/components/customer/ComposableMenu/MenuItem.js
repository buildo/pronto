import React from 'react';
import cx from 'classnames';
import { props, t } from 'tcomb-react';
import { pure, skinnable } from 'revenge';
import FlexView from 'FlexView';

@pure
@skinnable()
@props({
  name: t.String,
  price: t.maybe(t.Number),
  description: t.maybe(t.String),
  selected: t.Boolean,
  onClick: t.Function
})
export default class MenuItem extends React.Component {

  getLocals() {
    const { selected } = this.props;

    return {
      ...this.props,
      className: cx('menu-item', { 'is-selected': selected })
    };
  }

  template({ name, description, className, onClick }) {
    return (
      <FlexView {...{ className, onClick }}>
        <h4>{name}</h4>
        <div>{description}</div>
        <FlexView marginLeft='auto'>AZIONE</FlexView>
      </FlexView>
    );
  }

}
