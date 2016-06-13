import React from 'react';
import { props, t } from 'tcomb-react';
import { pure, skinnable } from 'revenge';
import { MenuItem } from 'model';
import { View } from 'Basic';

const inputStyle = { marginTop: 5, marginBottom: 5, padding: 5 };

@pure
@skinnable()
@props({
  item: MenuItem,
  onChange: t.Function
})
export default class Item extends React.Component {

  getLocals({ item, onChange }) {
    return {
      item,
      onChange: key => evt => onChange({ ...item, [key]: evt.target.value })
    };
  }

  template({ item: { shortName, name, description }, onChange }) {
    return (
      <View column grow className='item'>
        <View grow style={inputStyle}>
          <input
            value={shortName}
            onChange={onChange('shortName')}
            placeholder='Item Shortname'
          />
        </View>
        <View grow style={inputStyle}>
          <input
            value={name}
            onChange={onChange('name')}
            placeholder='Item Name'
          />
        </View>
        <View grow style={inputStyle}>
          <input
            value={description}
            onChange={onChange('description')}
            placeholder='Item Description'
          />
        </View>
      </View>
    );
  }
}