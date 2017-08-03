const winston = require('winston');
const keypair = require('keypair');
const BlockChain = require('./structs/BlockChain');
const Txn = require('./structs/Txn');
const blockHlpr = require('./helpers/block');
const proofHlpr = require('./helpers/proof');
const asymCryptoHlpr = require('./helpers/asymCrypto');

const blockchain = new BlockChain('0000');

let prevBlock = blockchain.getLastBlock();
winston.log('info', '----------------------------------------------------------------------');
winston.log('info', `Block: ${prevBlock.__index}`);
winston.log('info', `Hash: ${prevBlock.__hash}`);
winston.log('info', `Nonce: ${prevBlock.__nonce}`);
winston.log('info', `Txns: ${prevBlock.__data.length}`);
winston.log('info', '----------------------------------------------------------------------');
const numOfBlocksToAdd = 32;
const numOfTxnsInData = 1;
for (let i = 0; i < numOfBlocksToAdd; i += 1) {
  const dataBlock = [];
  for (let j = 0; j < numOfTxnsInData; j += 1) {
    const pair = keypair();
    const privateKey = pair.private;
    const publicKey = pair.public;
    const txn = new Txn('alice', 'bob', 0.00001, { hola: 'mundo' }, publicKey, privateKey);
    if (asymCryptoHlpr.verify(txn.__publicKey, txn.__signature, txn.toMessage())) {
      dataBlock.push(txn);
    }
  }
  const blockToAdd = blockHlpr.nextBlock(prevBlock, dataBlock);
  blockToAdd.setNonce(proofHlpr.work(blockToAdd.__hash, blockchain.__prefix));
  blockchain.concatBlock(blockToAdd);
  prevBlock = blockToAdd;
  winston.log('info', `Block: ${blockToAdd.__index}`);
  winston.log('info', `Hash: ${blockToAdd.__hash}`);
  winston.log('info', `Nonce: ${blockToAdd.__nonce}`);
  winston.log('info', `Txns: ${blockToAdd.__data.length}`);
  winston.log('info', '----------------------------------------------------------------------');
}
