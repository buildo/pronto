import React from 'react';
import loading from 'react-avenger/loading';

class NoLoading extends React.Component {
  render() { return null; }
}

export default loading({
  wrapper: <div style={{ textAlign: 'center', position: 'relative' }} />,
  loader: <NoLoading />
});
