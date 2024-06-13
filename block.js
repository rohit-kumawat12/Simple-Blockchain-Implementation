const {GENESIS_DATA, MINE_RATE} = require('./config');
const {cryptoHash} = require('./crypto-hash');
const hexToBinary = require('hex-to-binary');

class Block{
    constructor({timestamp, prevHash, hash, data, nonce, difficulty}){
         this.timestamp=timestamp;
         this.prevHash=prevHash;
         this.hash=hash;
         this.data=data;
         this.nonce=nonce;
         this.difficulty=difficulty;
    }
    static genesis(){
        return new this(GENESIS_DATA);
    }

    static mineBlock({prevBlock, data}){
        let hash, timestamp;
        let nonce =0;
        const prevHash = prevBlock.hash;
        let difficulty = prevBlock.difficulty;
        do{
            nonce++;
            timestamp = Date.now();
            difficulty=Block.adjustDifficulty({
                originalBlock: prevBlock,
                timestamp
            });
            hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty);
        }while(hexToBinary(hash).substring(0,difficulty)!=='0'.repeat(difficulty));
        return new this({timestamp, prevHash, hash, data, nonce, difficulty});
    }

    static adjustDifficulty({originalBlock, timestamp}){
        const {difficulty} = originalBlock;
        if(difficulty<1) return 1;
        if(timestamp - originalBlock.timestamp > MINE_RATE){
            return difficulty - 1;
        }else{
            return difficulty + 1;
        }
    }
}

module.exports = Block;

// const block1 = new Block({
//     timestamp:'2/09/22', hash:'0xacb', prevHash:'0xc12', data:'hello'
// });

// const result = Block.mineBlock({prevBlock:block1, data:"dataq"});

// console.log(result);
