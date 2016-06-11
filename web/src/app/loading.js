import React from 'react';
import loading from 'react-avenger/loading';
import { LoadingSpinner } from 'Basic';

export default loading({
  wrapper: <div style={{ textAlign: 'center', position: 'relative' }} />,
  loader: <LoadingSpinner size='medium' />
});
