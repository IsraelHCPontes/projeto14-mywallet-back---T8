import {signUp, signIn} from '../controllers/authController.js';
import {Router} from 'express';
import signUpValidation from '../middlewares/signUpValidationMiddleware.js';
import {emailAlreadyValidation} from '../middlewares/emailAlreadyValidation.js';
import {confirmePasswordValidation} from '../middlewares/confirmPasswordValidation.js'
import {signInValidationMiddleware} from '../middlewares/signInValidationMiddleware.js'

const router = Router();

router.post("/sign-up",
confirmePasswordValidation,
signUpValidation,
emailAlreadyValidation,
signUp); 

router.post("/sign-in",
signInValidationMiddleware,
signIn);

export default router;