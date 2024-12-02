const redis = require('redis');

const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN',
    TRANSACTION :'TRANSACTION'
};

class PubSub {
    constructor({ blockchain,transactionPool }) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;

        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        this.publisher.connect().then(() => {
            console.log('Publisher connected to Redis');
        }).catch(console.error);

        this.subscriber.connect().then(() => {
            console.log('Subscriber connected to Redis');
            this.subscribeToChannels();
        }).catch(console.error);
    }

    handleMessage(channel, message) {
        console.log(`Message Received. Channel: ${channel}. Message: ${message}`);

        const parsedMessage = JSON.parse(message);

        switch(channel) {
            case CHANNELS.BLOCKCHAIN :
                this.blockchain.replaceChain(parsedMessage);
                break;
            case CHANNELS.TRANSACTION :
                this.transactionPool.setTransaction(parsedMessage);
                break;
            default :
            return;
        }

    }

    subscribeToChannels() {
        Object.values(CHANNELS).forEach(channel => {
            this.subscriber.subscribe(channel, (message, channelName) => {
                this.handleMessage(channelName, message);
            });
        });
    }

    async publish({ channel, message }) {
        try {
            this.subscriber.unsubscribe(channel,() =>{
                 this.publisher.publish(channel, message, () =>{
                    this.subscriber.subscribe(channel);
                 });
            })
        } catch (error) {
            console.error('Error publishing message:', error);
        }
    }

    broadcastChain() {
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        });
    }

    broadcastTransaction() {
        this.publish({
            channel : CHANNELS.TRANSACTION,
            message : JSON.stringify(transaction)
        })
    }
}

module.exports = PubSub;
