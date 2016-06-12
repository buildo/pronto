import React from 'react';
import t from 'tcomb';
import cx from 'classnames';
import { props } from 'tcomb-react';
import { skinnable } from 'revenge';
import { FlexView, Poll } from 'Basic';
import { Order as OrderType } from 'model';
import Modal from 'Modal';
import OrderDetails from 'customer/OrderDetails';

import './order.scss';

@skinnable()
@props({
  order: OrderType,
  onAddPersonClick: t.Function,
  onPersonClick: t.Function,
  onDeletePersonClick: t.Function,
  onConfirmOrder: t.Function,
  maxPeopleNumber: t.Integer,
  refresh: t.Function
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

  getLocals({
    order: { peopleOrders: people }, onPersonClick,
    onDeletePersonClick, maxPeopleNumber, refresh
  }) {
    const {
      showConfirmModal, customerPhoneNumber, tableName,
      showNameModal, name
    } = this.state;

    return {
      onPersonClick,
      showConfirmModal,
      showNameModal,
      onAddPersonClick: people.length < maxPeopleNumber ? this.onAddPersonClick : undefined,
      onConfirmOrder: this.onConfirmOrder,
      openConfirmModal: this.openConfirmModal,
      openNameModal: people.length < maxPeopleNumber ? this.openNameModal : undefined,
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
      },
      orderDetailsProps: {
        people,
        onEditPerson: onPersonClick,
        onDeletePerson: onDeletePersonClick
      },
      refresh
    };
  }

  template({
    orderDetailsProps,
    onAddPersonClick, onConfirmOrder,
    openConfirmModal, openNameModal,
    showConfirmModal, showNameModal,
    modalConfirmProps: { tableInputProps, telephoneInputProps, ...modalConfirmProps },
    modalNameProps: { nameInputProps, ...modalNameProps },
    refresh
  }) {
    return (
      <FlexView className='order' grow column>
        <Poll interval={3000} callback={refresh} />
        <OrderDetails {...orderDetailsProps} />
        <button className={cx({ 'is-disabled': !openNameModal })} onClick={openNameModal}>
          Aggiungi persona
        </button>
        <button className='primary' onClick={openConfirmModal}>
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
