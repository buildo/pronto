import React from 'react';
import t from 'tcomb';
import { props } from 'tcomb-react';
import { skinnable } from 'revenge';
import { FlexView } from 'Basic';
import { Order as OrderType } from 'model';
import Modal from 'buildo-react-components/src/modal/Modal';

import './order.scss';

@skinnable()
@props({
  order: OrderType,
  onAddPersonClick: t.Function,
  onPersonClick: t.Function,
  onDeletePersonClick: t.Function,
  onConfirmOrder: t.Function
})
export default class Order extends React.Component {

  initialState = {
    showConfirmModal: false,
    customerPhoneNumber: null,
    tableName: null
  }

  state = {
    ...this.initialState
  }

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
    const { showConfirmModal, customerPhoneNumber, tableName } = this.state;

    return {
      order,
      onPersonClick,
      showConfirmModal,
      onAddPersonClick: this.onAddPersonClick,
      onDeletePersonClick: this.onDeletePersonClick,
      onConfirmOrder: this.onConfirmOrder,
      openModal: this.openModal,
      modalProps: {
        className: 'confirm-order-modal',
        transitionLeaveTimeout: 0,
        transitionEnterTimeout: 0,
        dismissOnClickOutside: true,
        iconClose: <i className='fa fa-close' />,
        onDismiss: this.closeModal,
        title: 'Riepilogo del tuo ordine',
        tableInputProps: {
          value: tableName,
          onChange: ({ target: { value: tableName } }) => (
            this.setState({ tableName })
          )
        },
        telephoneInputProps: {
          value: customerPhoneNumber,
          onChange: ({ target: { value: customerPhoneNumber } }) => (
            this.setState({ customerPhoneNumber })
          )
        }
      }
    };
  }

  template({
    order, onPersonClick, onDeletePersonClick,
    onAddPersonClick, onConfirmOrder, openModal, showConfirmModal,
    modalProps: { tableInputProps, telephoneInputProps, ...modalProps }
  }) {
    return (
      <FlexView className='order' column>
        <FlexView className='people' column>
          {order.people.map(this.templatePerson({ onPersonClick, onDeletePersonClick }))}
        </FlexView>
        <button onClick={onAddPersonClick}>
          Add person
        </button>
        <button onClick={openModal}>
          Conferma il tuo ordine
        </button>
        {showConfirmModal && (
          <Modal {...modalProps}>
            <FlexView column>
              <h1>
                Inserisci il nome del tuo tavolo!
              </h1>
              <input {...tableInputProps} />
              <p>
                Inserisci il tuo numero di telefono
              </p>
              <input {...telephoneInputProps} />
              <button onClick={onConfirmOrder}>
                CONFERMA
              </button>
            </FlexView>
          </Modal>
        )}
      </FlexView>
    );
  }
}
