import React from 'react';
import { props, t } from 'tcomb-react';
import { pure, skinnable } from 'revenge';
import { MenuGroup, MenuItem } from 'model';
import { View } from 'Basic';
import editList from './editList';
import Item from './Item';

const EditList = editList(MenuItem);

const inputStyle = { marginTop: 5, marginBottom: 5, padding: 5 };

const emptyItem = { shortName: '', name: '' };

@pure
@skinnable()
@props({
  group: MenuGroup,
  onChange: t.Function
})
export default class Group extends React.Component {

  getLocals({ group, onChange }) {
    return {
      group,
      onChange: key => evt => onChange({ ...group, [key]: evt.target.value }),
      onItemsChange: items => onChange({ ...group, items })
    };
  }

  template({ group: { description, items }, onChange, onItemsChange }) {
    return (
      <View column grow className='group'>
        <View grow style={inputStyle}>
          <input
            value={description}
            onChange={onChange('description')}
            placeholder='Group Description'
          />
        </View>
        <EditList
          items={items}
          renderItem={(item, onEdit) => <Item item={item} onChange={onEdit} />}
          newItem={() => emptyItem}
          onChange={onItemsChange}
          listTitle='Group Items'
          itemLabel='Group Item'
        />
      </View>
    );
  }
}