export default function fetchComponentData(dispatch, components, params) {
  const needs = components.reduce( (prev, current) => {
    return ((current && current.needs) || [])
      // .concat((current.WrappedComponent ? current.WrappedComponent.needs : []) || []) // Not sure I need this yet? Causing double up of calls..figure this out later
      .concat(prev);
  }, []);

  const promises = needs.map(need => dispatch(need(params)));

  return Promise.all(promises);
}
