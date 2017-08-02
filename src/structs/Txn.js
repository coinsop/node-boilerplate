const asymCryptoHlpr = require('../helpers/asymCrypto');

class Txn {
  constructor(from, to, fee, data = {}, publicKey, privateKey) {
    this.__from = from;
    this.__to = to;
    this.__fee = fee;
    this.__data = data;
    this.__timestamp = new Date().getTime();
    this.__signature = asymCryptoHlpr.sign(privateKey, this.concatTxn());
    this.__publicKey = publicKey;
  }

  concatTxn() {
    const message = `${this.__from}.${this.__to}.${this.__timestamp}.${JSON.stringify(this.__data)}.${this.__fee}`;
    return Buffer.from(message, 'utf8').toString('hex');
  }

  toMessage() {
    return this.concatTxn();
  }
}

module.exports = Txn;
