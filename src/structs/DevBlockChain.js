const genesisHlpr = require('../helpers/genesis');
const proofHlpr = require('../helpers/proof');

class DevBlockChain {
  constructor(prefix) {
    this.__prefix = prefix || '000000';
    this.__chain = [];
    const genesis = genesisHlpr.createGenesisBlock();
    genesis.setNonce(proofHlpr.work(genesis.__hash, this.__prefix));
    this.concatBlock(genesis);
  }

  concatBlock(block) {
    if (block.__nonce && proofHlpr.prove(block.__hash, block.__nonce, this.__prefix)) {
      this.__chain.push(block);
    } else {
      throw new Error('Invalid block');
    }
  }

  setPrefix(prefix) {
    this.__prefix = prefix;
  }

  getLastBlock() {
    return this.__chain[this.__chain.length - 1];
  }
}

module.exports = DevBlockChain;
