import routes from '../routes/customer';
import _isViewActive from 'state-react-router/isViewActive';
import routerDiff from 'state-react-router/routerDiff';

const routerStateKey = 'view';
const routerStatePathParamKeys = ['restaurantId', 'orderId', 'personId'];

// insert here any parameter that you don't want to serialize in the URL
const ignoreParams = [ routerStateKey, 'token', 'personItems' ];

export const {
  makeOnBrowserChange,
  makeSyncToBrowser
} = routerDiff({
  routerStateKey,
  routerStatePathParamKeys,
  ignoreParams
});

export const isViewActive = _isViewActive(routes);
