const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction', () =>{
    let transaction, senderWallet, recipient, amount;
    
    beforeEach(() =>{
        senderWallet = new Wallet();
        recipient = 'recipient-publicKey';
        amount = 50;
        transaction = new Transaction({senderWallet, recipient, amount})
    });

    it('has an `id`', () =>{
        expect(transaction).toHavePropperty('id');
    });

    describe('outputMap', () =>{
        it('has `outputMap`',() =>{
            expect(transaction).toHavePropperty('outputMap');
        });

        it('output the amount to the recipient',() =>{
            expect(transaction.outputMap[recipient]).toEqual(amount);
        });

        it('outputs the remaining balance for the `senderWallet`',() =>{
            expect(transaction.outputMap[senderWallet.publicKey])
                .toEqual(senderWallet.balance - amount);
        });
    });

});