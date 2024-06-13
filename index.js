const bodyParser = require('body-parser');
const express = require("express");
const request = require('request');
const Blockchain = require('./blockchain');
const PubSub = require('./publishsubscribe');

const app = express();
const DEFAULT_PORT = 3000;
let PEER_PORT;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

if(process.env.GENERATE_PEER_PORT==='true'){
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;

const blockchain = new Blockchain();

const pubsub = new PubSub({blockchain});

setTimeout(()=>pubsub.broadcastChain(),1000);

app.use(bodyParser.json());

app.get('/api/blocks',(req, res)=>{
    res.json(blockchain.chain);
});

app.post('/api/mine', (req,res)=>{

    const {data} = req.body;
    
    blockchain.addBlock({data});
    pubsub.broadcastChain();
    res.json(blockchain.chain);
    // res.redirect('http://localhost:3000/api/blocks');

});

const  synChains=()=>{
    request({url:`${ROOT_NODE_ADDRESS}/api/blocks`},(error, response, body)=>{
        if(!error && response.statusCode === 200){
            const rootChain = JSON.parse(body);
            console.log('replace chain on sync');
            blockchain.replaceChain(rootChain);
        }
    })
}

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    synChains();
});