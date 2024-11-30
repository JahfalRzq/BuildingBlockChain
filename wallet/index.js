const {STARTING_BALLANCE} = require('../config')

class Wallet {
    constructor(){
        this.balance = STARTING_BALLANCE;
    }
}

module.exports = Wallet;