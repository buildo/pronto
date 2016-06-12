import React from 'react';
import t from 'tcomb';
import { props } from 'tcomb-react';
import { skinnable } from 'revenge';
import { Content } from 'customer/Page';
import RightSidebar from 'customer/RightSidebar';
import Menu from 'customer/Menu';
import { RouteHandler } from 'react-router';

@skinnable()
@props({
  pending: t.Boolean
})
export default class Restaurant extends React.Component {

  templateRecap = () => (
    <Content>
      <h1>
        Il tuo ordine è stato accettato, presentati al ristorante quando desideri!
      </h1>
    </Content>
  )

  templateOrder = () => (
    <Content>
      <Menu />
      <RightSidebar>
        <RouteHandler />
      </RightSidebar>
    </Content>
  )

  template({ pending }) {
    return pending ? this.templateOrder() : this.templateRecap();
  }
}
