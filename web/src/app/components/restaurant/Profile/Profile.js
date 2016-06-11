import React from 'react';
import { skinnable, pure } from 'revenge';
import { t, props } from 'tcomb-react';
import { FlexView as View, Button } from 'Basic';

const InputField = ({ type, label, value, onChange }) => (
  <View grow>
    <label>{label}</label>
    <input {...{ type, value, onChange, style: { width: '100%' } }} />
  </View>
);

@skinnable()
@pure
@props({
  restaurantProfile: t.Object,
  updateRestaurantProfile: t.Function
})
export default class Profile extends React.Component {

  state = {
    ...this.props.restaurantProfile
  }

  onChange = (key) => ({ target: { value } }) => {
    this.setState({ [key]: value });
  }

  getLocals({ updateRestaurantProfile }) {

    return {
      updateRestaurantProfile,
      restaurantProfile: this.state
    };
  }

  template({
    updateRestaurantProfile,
    restaurantProfile,
    restaurantProfile: {
      name,
      description,
      telephone,
      address,
      maxPeoplePerOrder,
      imgUrl
    }
  }) {

    return (
      <View column>
        <InputField type='text' value={name} onChange={this.onChange('name')} />
        <InputField type='tel' value={telephone} onChange={this.onChange('telephone')} />
        <InputField type='text' value={address} onChange={this.onChange('address')} />
        <InputField
          type='number'
          value={maxPeoplePerOrder}
          onChange={this.onChange('maxPeoplePerOrder')}
        />
        <InputField type='text' value={imgUrl} onChange={this.onChange('imgUrl')} />
        <textarea value={description} onChange={this.onChange('description')} />
        <Button
          label='Salvare'
          baseState='ready'
          onClick={() => updateRestaurantProfile({ profile: restaurantProfile })}
        />
      </View>
    );
  }

}
