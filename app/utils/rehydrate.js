// import cache from './cache';

export default () => {
  var data = __DATA__.data;
  var token = __DATA__.token;
  Object.keys(data).forEach((key) => {
    // cache.set(token, key, data[key]);
  });
  delete window.__DATA__;
  return token;
};

