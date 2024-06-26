const redis = require('redis');

const CHANNELS = {
    TEST:'TEST',
    BLOCKCHAIN:'BLOCKCHAIN'
}

class PubSub{
    constructor({blockchain}){
        this.blockchain = blockchain;
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        this.subscriber.subscribe(CHANNELS.TEST);
        this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);

        this.subscriber.on('message',(channel,message)=>this.handleMessage(channel,message));
    }

    handleMessage(channel,message){
        console.log(`Received message ${message} on channel ${channel}`);
        const parseMessage = JSON.parse(message);
        if(channel===CHANNELS.BLOCKCHAIN){
            this.blockchain.replaceChain(parseMessage);
        }
    }

    publish({channel, message}){
        this.publisher.publish(channel, message);
    }

    broadcastChain(){
        this.publish({
            channel:CHANNELS.BLOCKCHAIN,
            message:JSON.stringify(this.blockchain.chain)
        })
    }
}

module.exports = PubSub;