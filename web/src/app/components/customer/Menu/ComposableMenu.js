import React from 'react';
import { props, t } from 'tcomb-react';
import { pure, skinnable } from 'revenge';
import { Menu } from 'model';
import FlexView from 'FlexView';
import MenuGroup from './MenuGroup';

@pure
@skinnable()
@props({
  value: t.maybe(t.list(t.String)), // Person.items
  onChange: t.Function,
  menu: Menu
})
export default class ComposableMenu extends React.Component {

  static defaultProps = {
    value: []
  }

  toggleMenuItem = ({ toAdd = [], toRemove }) => {
    const { value, onChange } = this.props;

    onChange(value.filter(v => v !== toRemove).concat(toAdd));
  }

  getLocals() {
    const {
      toggleMenuItem,
      props: { menu, value }
    } = this;

    return {
      toggleMenuItem,
      description: menu.description,
      groups: menu.groups,
      personItems: value
    };
  }

  templateGroups = ({ groups, toggleMenuItem, personItems }) => groups.map((g, i) => (
    <MenuGroup {...g} onChange={toggleMenuItem} personItems={personItems} key={i} />
  ))

  template({ description, groups, personItems, toggleMenuItem }) {
    return (
      <FlexView className='composable-menu' column>
        <h2>{description}</h2>
        <FlexView className='menu-groups' hAlignContent='center' column>
          {this.templateGroups({ groups, personItems, toggleMenuItem })}
        </FlexView>
      </FlexView>
    );
  }

}
