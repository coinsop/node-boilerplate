const DevBlock = require('../structs/DevBlock');

/**
 * Generates first block in the blockchain
 */
const createGenesisBlock = () => new DevBlock(0, new Date().getTime(), [], null);

module.exports = {
  createGenesisBlock
};
