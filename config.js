const MINE_RATE = 1000;
const INTIAL_DIFfICULTY = 3;

const GENESIS_DATA = {
    timestamp : 1,
    lastHash : '-----',
    hash : 'hash-one',
    difficulty : INTIAL_DIFfICULTY,
    nonce : 0,
    data : []
};

const STARTING_BALANCE = 1000;

module.exports = {GENESIS_DATA, MINE_RATE, STARTING_BALANCE};