import React from 'react';
import { props, t } from 'tcomb-react';
import { pure, skinnable } from 'revenge';
import { Menu as MenuT, MenuGroup } from 'model';
import { View, Button } from 'Basic';
import editList from './editList';
import Group from './Group';

// TODO(gio): mabe ask for confirmation when submitting
// import Modal from 'Modal';

// {showDeleteConfirm && (
//   <Modal {...deleteConfirmModalProps}>
//     <View column>
//       delete????
//       <button onClick={onDeleteConfirm}>
//         CONFERMA
//       </button>
//     </View>
//   </Modal>
// )}

import './menu.scss';

const EditList = editList(MenuGroup);

const inputStyle = { marginTop: 5, marginBottom: 5, padding: 5 };

const emptyGroup = { description: '', items: [] };

@pure
@skinnable()
@props({
  menu: MenuT,
  saveEnabled: t.Boolean,
  onChange: t.Function,
  onSubmit: t.Function
})
export default class Menu extends React.Component {

  getLocals({ menu, onChange, saveEnabled, onSubmit }) {
    return {
      menu,
      saveEnabled,
      onSubmit,
      onChange: key => evt => onChange({ ...menu, [key]: evt.target.value }),
      onGroupsChange: groups => onChange({ ...menu, groups })
    };
  }

  template({
    menu: { description, groups = [] }, onChange, saveEnabled, onSubmit, onGroupsChange
  }) {
    return (
      <View column grow className='menu'>
        <View grow style={inputStyle}>
          <textarea
            rows={4}
            value={description}
            onChange={onChange('description')}
            style={{ width: '100%', borderColor: '#DBDDE2' }}
            placeholder='Description'
          />
        </View>
        <EditList
          items={groups}
          renderItem={(group, onEdit) => <Group group={group} onChange={onEdit} />}
          newItem={() => emptyGroup}
          onChange={onGroupsChange}
          listTitle='Menu Groups'
          itemLabel='Menu Group'
        />
        <View grow style={inputStyle} hAlignContent='right'>
          <Button
            label={saveEnabled ? 'Save' : 'Saved.'}
            baseState={saveEnabled ? 'ready' : 'not-allowed'}
            onClick={onSubmit}
            style={{ width: 200 }}
          />
        </View>
      </View>
    );
  }
}