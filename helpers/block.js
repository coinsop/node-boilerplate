const DevBlock = require('../structs/DevBlock');

const nextBlock = function (prevBlock, data = []) {
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