import { Router } from "express";
import { signIn, signUp } from "../controllers/usersController.js";
import { signUpValidation } from "../middlewares/signupValidateMiddleware.js";
import { singInValidation } from "../middlewares/signInValidateMiddleware.js";

const router = Router();

router.post("/sign-up", signUpValidation, signUp);
router.post("/sign-in", singInValidation, signIn);

export default router;