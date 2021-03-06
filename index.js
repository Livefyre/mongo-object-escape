var mongoKey = require('mongo-key-escape');

exports.escape = function (obj) {
    return rewriteObjKeys(mongoKey.escape, obj);
};

exports.unescape = function (obj) {
    return rewriteObjKeys(mongoKey.unescape, obj);
};

function rewriteObjKeys(rewriteKey, obj) {
  var escaped = {};
  Object.keys(obj).forEach(function (key) {
    var val = obj[key];
    escaped[rewriteKey(key)] = shouldEscapeVal(val) ? rewriteObjKeys(rewriteKey, val) : val;
  });
  return escaped;
}

function shouldEscapeVal(val) {
  return val !== null
      && typeof val === 'object'
      && ! Array.isArray(val)
      && ! (val instanceof Date)
}
