import {Router} from 'express';
import {  getTransactions } from '../controllers/userContreller.js';
import {tokenValidation} from '../middlewares/tokenValidationMiddleware.js';

const router = Router();

router.use(tokenValidation)
router.get("/transactions", getTransactions)

export default router