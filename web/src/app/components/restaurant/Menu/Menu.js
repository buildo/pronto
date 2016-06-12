import React from 'react';
import { props, t } from 'tcomb-react';
import { pure, skinnable } from 'revenge';
import { Menu as MenuT, MenuGroup } from 'model';
import { View, Button } from 'Basic';
import editList from './editList';
import Group from './Group';
import './menu.scss';

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

const inputStyle = { marginTop: 5, marginBottom: 5, padding: 5 };

@pure
@skinnable()
@props({
  saveEnabled: t.Boolean,
  onSubmit: t.Function,
  onDiscard: t.Function
})
class Actions extends React.Component {
  template({ saveEnabled, onDiscard, onSubmit }) {
    return (
      <View grow style={inputStyle} hAlignContent='right' className='actions'>
        {saveEnabled && (
          <Button
            label='Discard changes'
            baseState='ready'
            onClick={onDiscard}
            style={{ width: 200 }}
          />
        )}
        <Button
          label={saveEnabled ? 'Save' : 'Saved.'}
          baseState={saveEnabled ? 'ready' : 'not-allowed'}
          onClick={onSubmit}
          style={{ width: 200 }}
        />
      </View>
    );
  }
}

const EditList = editList(MenuGroup);

const emptyGroup = { description: '', items: [] };

@pure
@skinnable()
@props({
  menu: MenuT,
  onChange: t.Function,
  saveEnabled: t.Boolean,
  onSubmit: t.Function,
  onDiscard: t.Function
})
export default class Menu extends React.Component { // eslint-disable-line react/no-multi-comp

  getLocals({ menu, onChange, saveEnabled, onSubmit, onDiscard }) {
    return {
      menu,
      onChange: key => evt => onChange({ ...menu, [key]: evt.target.value }),
      onGroupsChange: groups => onChange({ ...menu, groups }),
      actionsProps: {
        onDiscard, saveEnabled, onSubmit
      }
    };
  }

  template({
    menu: { description, groups = [] },
    onChange, onGroupsChange, actionsProps
  }) {
    return (
      <View column grow className='menu'>
        <Actions {...actionsProps} />
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
        <Actions {...actionsProps} />
      </View>
    );
  }
}