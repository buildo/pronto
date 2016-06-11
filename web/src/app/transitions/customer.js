export const transitionReducer = ({ view, ...state }) => ({
  ...state,
  view: view || 'restaurants'
});
