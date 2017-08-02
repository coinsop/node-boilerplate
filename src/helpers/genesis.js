const Block = require('../structs/Block');

/**
 * Generates first block in the blockchain
 */
const createGenesisBlock = () => new Block(0, [], null);

module.exports = {
  createGenesisBlock
};
