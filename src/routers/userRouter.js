import {Router} from 'express';
import {  getTransactions, postNewTransaction } from '../controllers/userContreller.js';
import {tokenValidation} from '../middlewares/tokenValidationMiddleware.js';
import {newTransactionValidationMiddleware} from '../middlewares/newTransactionValidationMiddleware.js';

const router = Router();

router.use(tokenValidation)
router.get("/transactions", getTransactions)
router.post("/transactions", newTransactionValidationMiddleware, postNewTransaction)

export default router