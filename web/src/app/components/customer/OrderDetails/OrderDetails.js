import React from 'react';
import { t, props } from 'tcomb-react';
import { skinnable } from 'revenge';
import { FlexView } from 'Basic';
import { Person } from 'model';

import './orderDetails.scss';
import './group-5@2x.png';

@skinnable()
@props({
  people: t.list(Person),
  onDeletePerson: t.maybe(t.Function),
  onEditPerson: t.maybe(t.Function)
})
export default class OrderDetails extends React.Component {

  templatePerson = ({ name, onEditPerson, onDeletePerson, items }) => (
    <FlexView column className='order-person' key={name}>
      <FlexView className='order-header' vAlignContent='center'>
        <div className='mini-logo' />
        {name}
        <FlexView marginLeft='auto' vAlignContent='center'>
          {onEditPerson && <i className='fa fa-pencil' onClick={() => onEditPerson(name)} />}
          {onDeletePerson && <i className='fa fa-close' onClick={() => onDeletePerson(name)} />}
        </FlexView>
      </FlexView>
      <FlexView column className='order-content'>
        {items.map(item => (
          <FlexView key={item} vAlignContent='center'>
            <div className='rectangle' />
            {item}
          </FlexView>
        ))}
      </FlexView>
    </FlexView>
  )

  template({ people, onEditPerson, onDeletePerson }) {
    return (
      <FlexView className='order-details' column shrink={false}>
        {people.map(person => this.templatePerson({ ...person, onEditPerson, onDeletePerson }))}
      </FlexView>
    );
  }
}
