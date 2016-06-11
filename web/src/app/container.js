import containerFactory from 'react-container';
import * as allQueries from 'queries';
import * as allCommands from 'commands';
import loadingDecorator from 'loading';

const container = containerFactory({ allQueries, allCommands });

export default (Component, cfg = {}) => container(Component, { loadingDecorator, ...cfg });
