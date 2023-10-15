import { Router } from 'express';
import solanaService from '../services/solana.service';

const router = Router();

router.get('/group', async (req, res) => {
    const { walletAddress } = req.query;

    try {
        const spending = await solanaService.getSpending(walletAddress as string);

        let group;
        if (spending > 10000) {
            group = 'high';
        } else if (spending > 5000) {
            group = 'medium';
        } else {
            group = 'low';
        }

        res.json({ group });
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
