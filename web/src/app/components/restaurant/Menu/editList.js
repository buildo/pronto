import React from 'react';
import { props, t } from 'tcomb-react';
import { pure, skinnable } from 'revenge';
import { View } from 'Basic';
import './editList.scss';

export default function editList(T) {
  @pure
  @skinnable()
  @props({
    items: t.list(T),
    renderItem: t.Function, // (T, onChange: t.Function) => t.ReactElement
    newItem: t.Function,
    onChange: t.Function,
    listTitle: t.ReactChild,
    itemLabel: t.String
  })
  class EditList extends React.Component {
    static defaultProps = {
      items: []
    };

    state = { confirmDelete: null };

    getLocals({ onChange, newItem, items, listTitle, itemLabel, ...props }) {
      return {
        ...props,
        items,
        onAdd: () => onChange(items.concat(T(newItem()))),
        onDelete: i => () => onChange(items.slice(0, i).concat(items.slice(i + 1, items.length))),
        onEdit: i => newItem => onChange(
          items.slice(0, i).concat(newItem).concat(items.slice(i + 1, items.length))
        ),
        title: items.length > 0 && listTitle,
        addLabel: `Add ${itemLabel}`
      };
    }

    template({ items, renderItem, onAdd, onDelete, onEdit, title, addLabel }) {
      return (
        <View column grow className='edit-list'>
          <View className='title'>{title}</View>
          <View column className='list'>
            {items.map((item, i) => (
              <View key={i} grow vAlignContent='top' className='list-item'>
                {renderItem(item, onEdit(i))}
                <i onClick={onDelete(i)} className='fa fa-close delete-button' />
              </View>
            ))}
          </View>
          <View
            className='add-button'
            onClick={onAdd}
            hAlignContent='right'
          >{addLabel}</View>
        </View>
      );
    }
  }

  return EditList;
}
