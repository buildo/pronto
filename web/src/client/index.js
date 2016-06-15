import 'babel-polyfill';
import 'isomorphic-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import t from 'tcomb';
import config from '../../config';
import Router from 'react-router';
import debug from 'debug';
import mkAvenger from 'avenger';
import { QueriesContextTypes } from 'react-avenger/queries';
import { CommandsContextTypes } from 'react-avenger/commands';
import run from 'state/run';
import mapValues from 'lodash/mapValues';

import 'assets';

if (process.env.NODE_ENV === 'development') {
  // lighten stringify
  // TODO(gio): maybe not..
  // convert assert messages to lazy ones in all deps instead?
  t.stringify = String;

  // export for debug
  window.React = React;

  // fail loudly
  t.fail = function(message) {
    if (!t.fail.failed) {
      debugger; //eslint-disable-line no-debugger
      t.fail.failed = true;
    }
    throw new TypeError(message);
  };

  debug.enable(config.debug || '');
} else {
  debug.disable();
}

const log = debug('app:client');

export default function client({
  transitionReducer, routes, initialState = {}, queries = {}, commands: _commands = {},
  makeOnBrowserChange, mergeStateAndBrowserState, makeSyncToBrowser
}) {
  function renderApp(mountNode: HTMLElement) {

    const router = Router.create({
      routes, location: Router.HashLocation
    });

    const avenger = mkAvenger(queries);
    avenger.error.subscribe(::console.error); // eslint-disable-line no-console

    const commands = mapValues(_commands, cmd => params => avenger.runCommand(cmd, params));

    run({
      initialState,
      syncToBrowser: makeSyncToBrowser(router),
      mergeStateAndBrowserState,
      transitionReducer,
      provideContext: {
        avenger, commands
      },
      provideContextTypes: {
        ...QueriesContextTypes,
        ...CommandsContextTypes
      },
      onBrowserChange: makeOnBrowserChange(
        router,
        Handler => () => <Handler /> // eslint-disable-line react/display-name
      ),
      render: (element: t.ReactElement) => {
        ReactDOM.render(element, mountNode);
      },
      subscribe: s => {
        log('state', s);
      }
    });
  }

  return function main(
    mountNode: HTMLElement,
    initialState: ?Object,
    initialCache
  ) {
    renderApp(mountNode, initialState, initialCache);
  };
}
