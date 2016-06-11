import client from './index';
import { transitionReducer } from '../app/transitions/customer';
import * as queries from '../app/queries';
import * as commands from '../app/commands';
import routes from '../app/routes/customer';

const initialState = {
  token: localStorage.getItem('token') || null
};

import {
  makeOnBrowserChange,
  mergeStateAndBrowserState,
  makeSyncToBrowser
} from '../app/state-react-router/customer';

export const main = client({
  initialState, transitionReducer, queries, commands, routes,
  makeOnBrowserChange, mergeStateAndBrowserState, makeSyncToBrowser
});
