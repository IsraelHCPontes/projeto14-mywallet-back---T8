import {signUp, signIn} from '../controllers/authController.js';
import {Router} from 'express';
import signUpValidation from '../middlewares/signUpValidationMiddleware.js';
import {emailAlreadyValidation} from '../middlewares/emailAlreadyValidation.js';
import {confirmePasswordValidation} from '../middlewares/confirmPasswordValidation.js'

const router = Router();

router.post("/sign-up",
confirmePasswordValidation,
signUpValidation,
emailAlreadyValidation,
signUp); 

router.get("/sign-in", signIn);

export default router;