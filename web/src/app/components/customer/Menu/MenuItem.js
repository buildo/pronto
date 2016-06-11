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
  selected: t.maybe(t.Boolean),
  onClick: t.maybe(t.Function)
})
export default class MenuItem extends React.Component {

  getLocals() {
    const { selected } = this.props;

    return {
      ...this.props,
      selected,
      className: cx('menu-item', { 'is-selected': selected })
    };
  }

  template({ name, description, price, className, onClick, selected }) {
    return (
      <FlexView {...{ className, onClick }}>
        <FlexView grow column>
          <div className='name'>{name}</div>
          <div className='description'>{description}</div>
        </FlexView>
        <FlexView marginLeft='auto' shrink={false}>
          {price && <div className='price'>{price}</div>}
          {onClick && <input className='checkbox' readOnly checked={selected} type='checkbox' />}
        </FlexView>
      </FlexView>
    );
  }

}
