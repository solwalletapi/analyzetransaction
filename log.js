const solanaWeb3 = require("@solana/web3.js");

const searchAddress = 'vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg';
const getTransactions = async (address, numTx) => {
    const pubKey = new solanaWeb3.PublicKey(address);
    const endpoint = "https://nameless-autumn-dinghy.solana-devnet.discover.quiknode.pro/a6db29d357a335610e1ffa82ee6802ea801172ce/";
    const solanaConnection = new solanaWeb3.Connection(endpoint);
    let transactionList = await solanaConnection.getSignaturesForAddress(pubKey, {limit: numTx});
    const accInfo = await solanaConnection.getAccountInfo(pubKey);
    console.log(`Account Balance: ${accInfo.lamports / 1000000000} SOL`);
    console.log(`Account Address: ${address}`);
    console.log(`Number of Transactions: ${transactionList.length}`);
    const hash = accInfo.data[0]
    console.log(`Account hash: ${hash}`);
    console.log(("-").repeat(20));
    const url = `https://api.devnet.solana.com/tx/${transactionList[0].signature}?encoding=json`;
    // const url = `https://api.solana.fm/v0/accounts/${hash}`;
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    console.log(response.json());

    let signatureList = transactionList.map(transaction => transaction.signature);
    let transactionDetails = await solanaConnection.getParsedTransactions(signatureList, {maxSupportedTransactionVersion: 0});
    transactionList.forEach((transaction, i) => {
        const date = new Date(transaction.blockTime * 1000);
        const transactionInstructions = transactionDetails[i].transaction.message.instructions;
        console.log(`Transaction No: ${i + 1}`);
        console.log(`Signature: ${transaction.signature}`);
        console.log(`Time: ${date}`);
        console.log(`Status: ${transaction.confirmationStatus}`);
        transactionInstructions.forEach((instruction, n) => {
            console.log(`---Instructions ${n + 1}: ${instruction.programId.toString()}`);
        })
        console.log(("-").repeat(20));
    })
}

function main() {
    getTransactions(searchAddress, 100);
}

main();
