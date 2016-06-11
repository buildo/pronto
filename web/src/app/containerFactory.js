import React from 'react';
import { t, props } from 'tcomb-react';
import pick from 'lodash/pick';
import compact from 'lodash/compact';
import flowRight from 'lodash/flowRight';
import { skinnable, pure } from 'revenge';
import connect from 'state/connect';
import queries from 'react-avenger/queries';
import allQueries from 'queries';

const contains = Component => locals => <Component {...locals} />; //eslint-disable-line

const declareConnect = (decl = {}, config = {}) => (
  connect(decl, { killProps: ['params', 'query', 'router'], ...config })
);
const declareCommands = {};
const declareQueries = queries(allQueries);

const argumentsTypes = t.struct({
  connect: t.maybe(t.dict(t.String, t.Function)),
  queries: t.maybe(t.list(t.String)),
  commands: t.maybe(t.list(t.String))
});

const _containerFactory = (Component, { connect, queries, commands }) => {
  const declaredQueries = queries && declareQueries(queries);
  const declaredCommands = commands && declareCommands(commands);
  const declaredConnect = connect && declareConnect(connect);
  const propsTypes = {
    ...(queries ? declaredQueries.Type : {}),
    ...(commands ? declaredCommands.Type : {}),
    ...(connect ? declaredConnect.Type : {})
  };
  const composedDecorators = flowRight(...compact([
    declaredQueries,
    declaredCommands,
    declaredConnect
  ]));
  return (getComponentProps = (props) =>
          pick(props, [
            ...(queries || []),
            ...(commands || []),
            ...Object.keys(connect || {})
          ])) => (
    @composedDecorators
    @skinnable(contains(Component))
    @pure
    @props(propsTypes)
    class ContainerFactoryWrapper extends React.Component {
      static displayName = `${Component.displayName || Component.name || 'Component'}Container`;
      getLocals() { return getComponentProps(this.props); }
    }
  );

};

const containerFactory = t.func([t.Function, argumentsTypes], t.Function)
  .of(_containerFactory, true);

export default (Component, args) => containerFactory(Component, argumentsTypes(args));
