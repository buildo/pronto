import React from 'react';
import { skinnable, pure } from 'revenge';
import { t, props } from 'tcomb-react';
import { FlexView as View, Button } from 'Basic';
import isEqual from 'lodash/isEqual';

const inputStyle = { marginTop: 5, marginBottom: 5, padding: 5 };

const InputField = ({ type, value, placeholder, onChange }) => (
  <View grow style={inputStyle}>
    <input {...{ type, value, onChange, placeholder, style: { width: '100%' } }} />
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
    this.setState({ [key]: key === 'maxPeopleNumber' ? parseInt(value, 10) : value });
  }

  componentWillReceiveProps(props) {
    if (this.props.restaurantProfile !== props.restaurantProfile) {
      this.setState(props.restaurantProfile);
    }
  }

  getLocals({ updateRestaurantProfile }) {
    return {
      updateRestaurantProfile,
      restaurantProfile: this.state,
      saveEnabled: !isEqual(this.state, this.props.restaurantProfile)
    };
  }

  template({
    updateRestaurantProfile,
    restaurantProfile,
    saveEnabled,
    restaurantProfile: {
      name,
      description,
      telephone,
      address,
      maxPeopleNumber,
      imgUrl
    }
  }) {

    return (
      <View column grow style={{ margin: 20 }}>
        <InputField
          type='text'
          value={name}
          onChange={this.onChange('name')}
          placeholder='Name'
        />
        <InputField
          type='tel'
          value={telephone}
          onChange={this.onChange('telephone')}
          placeholder='Phone Number'
        />
        <InputField
          type='text'
          value={address}
          onChange={this.onChange('address')}
          placeholder='Address'
        />
        <InputField
          type='number'
          value={maxPeopleNumber}
          onChange={this.onChange('maxPeopleNumber')}
          placeholder='Max people per order'
        />
        <InputField
          type='text'
          value={imgUrl}
          onChange={this.onChange('imgUrl')}
          placeholder='Image URL'
        />
        <View grow style={inputStyle}>
          <textarea
            rows={4}
            value={description}
            onChange={this.onChange('description')}
            style={{ width: '100%', borderColor: '#DBDDE2' }}
            placeholder='Description'
          />
        </View>
        <View grow style={inputStyle} hAlignContent='right'>
          <Button
            label='Save'
            baseState={saveEnabled ? 'ready' : 'not-allowed'}
            onClick={() => updateRestaurantProfile({ profile: restaurantProfile })}
            style={{ width: 200 }}
          />
        </View>
      </View>
    );
  }

}
