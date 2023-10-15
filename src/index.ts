import express from 'express';
import cors from 'cors';
import spendingGroupRouter from './routes/spendings.group';


const app = express();

app.use(cors({
    origin: '*',
}));

app.use('/group',spendingGroupRouter);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
