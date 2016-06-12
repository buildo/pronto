import React from 'react';
import { RouteHandler } from 'react-router';
import Page, { Header, Content, Footer } from 'customer/Page';
import RightSidebar from 'customer/RightSidebar';
import Menu from 'customer/Menu';

console.log({ Page });

export default class RestaurantHandler extends React.Component {
  render() {
    return (
      <Page>
        <Header>
          Header goes here...
        </Header>
        <Content>
          <Menu />
          <RightSidebar>
            <RouteHandler />
          </RightSidebar>
        </Content>
        <Footer />
      </Page>
    );
  }
}
