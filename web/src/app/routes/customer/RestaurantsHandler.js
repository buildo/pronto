import React from 'react';
import Page, { Content, Footer } from 'customer/Page';
import Restaurants from 'customer/Restaurants';
import RestaurantsHeader from 'customer/RestaurantsHeader';
import RestaurantDetailsHeader from 'customer/RestaurantDetailsHeader';


export default class RestaurantsHandler extends React.Component {
  render() {
    return (
      <Page>
        <RestaurantsHeader />
        <RestaurantDetailsHeader />
        <Content>
          <Restaurants />
        </Content>
        <Footer />
      </Page>

    );
  }
}
