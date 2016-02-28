export default function fetchComponentData(dispatch, components, params) {
  const needs = components.reduce((prev, current) => ((current && current.needs) || []).concat(prev), []);

  const promises = needs.map(need => dispatch(need(params)));

  return Promise.all(promises);
}
