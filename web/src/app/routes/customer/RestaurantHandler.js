import React from 'react';
import { RouteHandler } from 'react-router';
import Page, { Content, Footer } from 'customer/Page';
import RightSidebar from 'customer/RightSidebar';
import Menu from 'customer/Menu';
import RestaurantHeader from 'customer/RestaurantHeader';

export default class RestaurantHandler extends React.Component {
  render() {
    return (
      <Page>
        <RestaurantHeader />
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
