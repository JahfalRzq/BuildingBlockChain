const redis = require('redis');

const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN'
};

class PubSub {
    constructor({ blockchain }) {
        this.blockchain = blockchain;

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

        if (channel === CHANNELS.BLOCKCHAIN) {
            this.blockchain.replaceChain(parsedMessage);
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
            await this.publisher.publish(channel, message);
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
}

module.exports = PubSub;
    