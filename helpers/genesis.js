const DevBlock = require('../structs/DevBlock');

const createGenesisBlock = function () {
  return new DevBlock(0, new Date().getTime(), [], null);
};

module.exports = {
  createGenesisBlock
};