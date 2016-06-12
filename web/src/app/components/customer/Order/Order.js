import React from 'react';
import t from 'tcomb';
import { props } from 'tcomb-react';
import { skinnable } from 'revenge';
import { FlexView } from 'Basic';
import { Order as OrderType } from 'model';
import Modal from 'Modal';

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
    showNameModal: false,
    customerPhoneNumber: null,
    tableName: null,
    name: null
  }

  state = {
    ...this.initialState
  }

  onAddPersonClick = () => {
    const { name } = this.state;

    const trimmedName = name && name.trim();
    if (trimmedName) {
      this.props.onAddPersonClick(trimmedName);
    }
  }

  onDeletePersonClick = (personId) => (e) => {
    e.stopPropagation();
    if (window.confirm(`Eliminare l\'ordine di ${personId}?`)) {
      this.props.onDeletePersonClick(personId);
    }
  }

  onConfirmOrder = () => {
    const { customerPhoneNumber, tableName } = this.state;

    const trimmedPhone = customerPhoneNumber && customerPhoneNumber.trim();
    const trimmedTable = tableName && tableName.trim();
    if (trimmedPhone && trimmedTable) {
      this.props.onConfirmOrder({
        customerPhoneNumber: trimmedPhone,
        tableName: trimmedTable
      });
      this.setState({ ...this.initialState });
    }
  }

  openConfirmModal = () => this.setState({ ...this.initialState, showConfirmModal: true })

  closeConfirmModal = () => this.setState({ ...this.initialState, showConfirmModal: false })

  openNameModal = () => this.setState({ ...this.initialState, showNameModal: true })

  closeNameModal = () => this.setState({ ...this.initialState, showNameModal: false })

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
    const {
      showConfirmModal, customerPhoneNumber, tableName,
      showNameModal, name
    } = this.state;

    return {
      order,
      onPersonClick,
      showConfirmModal,
      showNameModal,
      onAddPersonClick: this.onAddPersonClick,
      onDeletePersonClick: this.onDeletePersonClick,
      onConfirmOrder: this.onConfirmOrder,
      openConfirmModal: this.openConfirmModal,
      openNameModal: this.openNameModal,
      modalConfirmProps: {
        className: 'confirm-order-modal',
        onDismiss: this.closeConfirmModal,
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
      },
      modalNameProps: {
        className: 'name-order-modal',
        onDismiss: this.closeNameModal,
        title: 'Inserisci il tuo nome',
        nameInputProps: {
          value: name,
          onChange: ({ target: { value: name } }) => this.setState({ name })
        }
      }
    };
  }

  template({
    order, onPersonClick, onDeletePersonClick,
    onAddPersonClick, onConfirmOrder,
    openConfirmModal, openNameModal,
    showConfirmModal, showNameModal,
    modalConfirmProps: { tableInputProps, telephoneInputProps, ...modalConfirmProps },
    modalNameProps: { nameInputProps, ...modalNameProps }
  }) {
    return (
      <FlexView className='order' column>
        <FlexView className='people' column>
          {order.people.map(this.templatePerson({ onPersonClick, onDeletePersonClick }))}
        </FlexView>
        <button onClick={openNameModal}>
          Aggiungi persona
        </button>
        <button onClick={openConfirmModal}>
          Invia ordine
        </button>
        {showConfirmModal && (
          <Modal {...modalConfirmProps}>
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
        {showNameModal && (
          <Modal {...modalNameProps}>
            <FlexView column>
              <p>Nome</p>
              <input {...nameInputProps} />
              <button onClick={onAddPersonClick}>
                Prosegui
              </button>
            </FlexView>
          </Modal>
        )}
      </FlexView>
    );
  }
}
