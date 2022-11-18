import {signUp, signIn} from '../controllers/authController.js';
import {Router} from 'express';
import signUpValidation from '../middlewares/signUpValidationMiddleware.js';

const router = Router();

router.post("/sign-up",signUpValidation, signUp); 

router.get("/sign-in", signIn);

export default router;