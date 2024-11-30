const {STARTING_BALLANCE} = require('../config');
const {ec} = require('../util');


class Wallet {
    constructor(){
        this.balance = STARTING_BALLANCE;

        const keyPair = ec.genKeyPair();

        this.publicKey = keyPair.getPublic();
    }
}

module.exports = Wallet;