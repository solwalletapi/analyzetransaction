"use strict";
// src/services/solanaService.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class SolanaService {
    getSpending(walletAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            // Call the Solana API to get spending data
            const response = yield axios_1.default.get(`https://pro-api.solscan.io/pro-api-docs/v1.0#/NFT%20Token/TokenInfo?wallet=${walletAddress}`);
            const spending = response.data; // Assume data contains spending info
            return spending;
        });
    }
}
exports.default = new SolanaService();
