import React from 'react';
import loading from 'react-avenger/loading';
import { FlexView, LoadingSpinner } from 'Basic';

export default loading({
  wrapper: <FlexView style={{ position: 'relative' }} />,
  loader: <LoadingSpinner size='medium' />
});
