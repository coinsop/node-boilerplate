const crypto = require('crypto');

const work = function (hash, prefix) {
  let id = 0;
  let nonce = null;
  let str = null;
  while (true) {
    nonce = id.toString(16);
    str = crypto.createHash('sha256').update(hash).update(nonce).digest('hex');
    if (str.substring(0, prefix.length) === prefix) {
      return nonce;
    } else {
      id += 1;
    }
  }
};

const prove = function (hash, nonce, prefix) {
  return crypto.createHash('sha256').update(hash).update(nonce).digest('hex').substring(0, prefix.length) === prefix;
};

module.exports = {
  work,
  prove
};