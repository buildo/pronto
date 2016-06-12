import React from 'react';
import t from 'tcomb';
import { props } from 'tcomb-react';
import { skinnable } from 'revenge';
import { FlexView } from 'Basic';
import { Order as OrderType } from 'model';


@skinnable()
@props({
  order: OrderType,
  onAddPersonClick: t.Function,
  onPersonClick: t.Function,
  onDeletePersonClick: t.Function,
  onConfirmOrder: t.Function
})
export default class Order extends React.Component {

  onAddPersonClick = () => {
    const personId = window.prompt('Inserisci il nome della persona');
    personId.trim() && this.props.onAddPersonClick(personId.trim());
  }

  onDeletePersonClick = (personId) => (e) => {
    e.stopPropagation();
    if (window.confirm(`Eliminare l\'ordine di ${personId}?`)) {
      this.props.onDeletePersonClick(personId);
    }
  }

  onConfirmOrder = () => {
    const { customerPhoneNumber, tableName } = this.state;
    this.props.onConfirmOrder({ customerPhoneNumber, tableName });
    this.setState({ ...this.initialState });
  }

  openModal = () => this.setState({ ...this.initialState, showConfirmModal: true })

  closeModal = () => this.setState({ ...this.initialState, showConfirmModal: false })

  templatePersonItem = (item, key) => (
    <FlexView key={key}>
      {item}
    </FlexView>
  )

  templatePerson = ({ onPersonClick, onDeletePersonClick }) => (person, key) => (
    <FlexView key={key} column>
      <FlexView onClick={onPersonClick(person.name)}>
        <FlexView grow>
          {person.name}
        </FlexView>
        <FlexView hAlignContent='right' onClick={onDeletePersonClick(person.name)}>
          x
        </FlexView>
      </FlexView>
      <FlexView className='items' column>
        {person.items.map(this.templatePersonItem)}
      </FlexView>
    </FlexView>
  )

  getLocals({ order, onPersonClick }) {
    return {
      order,
      onAddPersonClick: this.onAddPersonClick,
      onPersonClick,
      onDeletePersonClick: this.onDeletePersonClick
    };
  }

  template({ order, onPersonClick, onDeletePersonClick, onAddPersonClick }) {
    return (
      <FlexView className='order' column>
        <FlexView className='people' column>
          {order.people.map(this.templatePerson({ onPersonClick, onDeletePersonClick }))}
        </FlexView>
        <button onClick={onAddPersonClick}>
          Add person
        </button>

      </FlexView>
    );
  }
}
