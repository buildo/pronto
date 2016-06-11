import t from 'tcomb';

export const transitionReducer = ({ token, view, ...state }) => ({
  ...state,
  token,
  view: (t.Nil.is(token) && 'login')
    || (!t.Nil.is(token) && view === 'login' && 'hello')
    || (view || 'hello')
});
