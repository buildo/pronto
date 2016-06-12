import React from 'react';
import Page, { Footer } from 'customer/Page';
import Restaurant from 'customer/Restaurant';
import RestaurantHeader from 'customer/RestaurantHeader';

export default class RestaurantHandler extends React.Component {
  render() {
    return (
      <Page>
        <RestaurantHeader />
        <Restaurant />
        <Footer />
      </Page>
    );
  }
}
