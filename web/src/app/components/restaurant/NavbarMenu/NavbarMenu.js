import React from 'react';
import { props, t } from 'tcomb-react';
import { pure, skinnable } from 'revenge';
import { View } from 'Basic';

const Item = t.interface({
  label: t.String, onClick: t.Function, active: t.Boolean
}, { strict: false, name: 'Item' });

const style = active => ({ padding: 5, color: active ? 'red' : 'black' });

@pure
@skinnable()
@props({
  items: t.list(Item)
})
export default class NavbarMenu extends React.Component {

  templateItem = ({ label, active, onClick }) => (
    <a key={label} style={style(active)} onClick={onClick}>{label}</a>
  );

  template({ items }) {
    return (
      <View>
        {items.map(this.templateItem)}
      </View>
    );
  }
}