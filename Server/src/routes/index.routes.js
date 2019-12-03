import express from 'express';
import AccountRouter from './account.routes';
import ProductRouter from './product.routes';

const router = express.Router();

// API api
router.use('/api', AccountRouter);
router.use('/api', ProductRouter);


export default router;
