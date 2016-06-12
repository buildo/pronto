import client from './index';
import { transitionReducer } from '../app/transitions/restaurant';
import * as queries from '../app/queries';
import * as commands from '../app/commands';
import routes from '../app/routes/restaurant';

const initialState = {
  token: localStorage.getItem('token') || null,
  restaurantId: '1' // TODO(gio) remove
};

import {
  makeOnBrowserChange,
  mergeStateAndBrowserState,
  makeSyncToBrowser
} from '../app/state-react-router/restaurant';

export const main = client({
  initialState, transitionReducer, queries, commands, routes,
  makeOnBrowserChange, mergeStateAndBrowserState, makeSyncToBrowser
});
