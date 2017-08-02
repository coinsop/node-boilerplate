const winston = require('winston');
const DevBlockChain = require('./structs/DevBlockChain');
const blockHlpr = require('./helpers/block');
const proofHlpr = require('./helpers/proof');

const blockchain = new DevBlockChain();

let prevBlock = blockchain.getLastBlock();
winston.log('info', '----------------------------------------------------------------------');
winston.log('info', `Block: ${prevBlock.__index}`);
winston.log('info', `Hash: ${prevBlock.__hash}`);
winston.log('info', `Nonce: ${prevBlock.__nonce}`);
winston.log('info', '----------------------------------------------------------------------');
const numOfBlocksToAdd = 32;

for (let i = 0; i < numOfBlocksToAdd; i += 1) {
  const blockToAdd = blockHlpr.nextBlock(prevBlock, [{
    from: 'from_address',
    to: 'to_address',
    fee: 0,
    sign: 'sha256_signature',
    data: {}
  }]);
  blockToAdd.setNonce(proofHlpr.work(blockToAdd.__hash, blockchain.__prefix));
  blockchain.concatBlock(blockToAdd);
  prevBlock = blockToAdd;
  winston.log('info', `Block: ${blockToAdd.__index}`);
  winston.log('info', `Hash: ${blockToAdd.__hash}`);
  winston.log('info', `Nonce: ${blockToAdd.__nonce}`);
  winston.log('info', '----------------------------------------------------------------------');
}
