// src/services/solanaService.ts

import axios from 'axios';
import { Connection } from '@solana/web3.js';

class SolanaService {
    async getSpending(walletAddress:any): Promise<number> {
        const connection = new Connection("https://api.devnet.solana.com");
        const balance = await connection.getBalance(walletAddress);
        console.log('balance: ',balance);
        const x = balance / 1000000000;
        console.log('spent on transaction: ',x);
        const transactions = await connection.getConfirmedSignaturesForAddress2(walletAddress, {limit: 100});
        console.log('transactions: ',transactions);
        const y = transactions.length * 0.0005;
        console.log('spent on transaction: ',y);
        const accountInfo = await connection.getAccountInfo(walletAddress);
        console.log('accountInfo: ',accountInfo);
        //@ts-ignore
        const z = accountInfo?.lamports / 1000000000;
        const response = await axios.get(`https://pro-api.solscan.io/pro-api-docs/v1.0#/NFT%20Token/TokenInfo?wallet=${walletAddress}`);
        const spending = response.data;  // Assume data contains spending info
        return spending;
    }
}

export default new SolanaService();
