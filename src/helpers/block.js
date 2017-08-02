const DevBlock = require('../structs/DevBlock');

/**
 * Generates next block on the blockchain
 * @param {Object} prevBlock last block in the blockchain
 * @param {Array} data array of transacctions to insert in block
 */
const nextBlock = (prevBlock, data = []) => {
  if (!Array.isArray(data)) {
    throw new Error('Block data must be an array');
  } else {
    const index = prevBlock.__index + 1;
    const timestamp = new Date().getTime();
    const previous = prevBlock.hashBlock();
    return new DevBlock(index, timestamp, data, previous);
  }
};

module.exports = {
  nextBlock
};
