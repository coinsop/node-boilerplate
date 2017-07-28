const crypto = require('crypto');

class DevBlock {
  constructor(index, timestamp, data, previous) {
    this.__index = index;
    this.__timestamp = timestamp;
    this.__data = data;
    this.__previous = previous;
    this.__hash = this.hashBlock();
    this.__nonce = null;
  }

  concatBlock() {
    return `${this.__index}.${this.__timestamp}.${JSON.stringify(this.__data)}.${this.__previous}`;
  }

  setNonce(nonce) {
    this.__nonce = nonce;
  }

  hashBlock() {
    return crypto.createHash('sha256')
      .update(this.concatBlock())
      .digest('hex');
  }
}

module.exports = DevBlock;