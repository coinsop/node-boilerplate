const crypto = require('crypto');

/**
 * Calculates proof of work for a given hash and prefix
 * @param {String} hash
 * @param {String} prefix
 */
const work = (hash, prefix) => {
  let id = 0;
  let nonce = null;
  let str = null;
  let proof = null;
  while (proof === null) {
    nonce = id.toString(16);
    str = crypto.createHash('sha256').update(hash).update(nonce).digest('hex');
    if (str.substring(0, prefix.length) === prefix) {
      proof = nonce;
      return proof;
    }
    id += 1;
  }
  return null;
};

/**
 * Checks if a proof is valid for a hash
 * @param {*} hash
 * @param {*} nonce calculated proof
 * @param {*} prefix
 */
const prove = (hash, nonce, prefix) => crypto.createHash('sha256')
  .update(hash)
  .update(nonce)
  .digest('hex')
  .substring(0, prefix.length) === prefix;

module.exports = {
  work,
  prove
};
