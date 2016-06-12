import React from 'react';
import Page, { Header, Content, Footer } from 'customer/Page';
import Restaurants from 'customer/Restaurants';


export default class RestaurantsHandler extends React.Component {
  render() {
    return (
      <Page>
        <Header>
          Header goes here...
        </Header>
        <Content>
          <Restaurants />
        </Content>
        <Footer />
      </Page>

    );
  }
}
