import { Router } from "express";
import { getRanking, myUrls, signIn, signUp } from "../controllers/usersController.js";
import { signUpValidation } from "../middlewares/signupValidateMiddleware.js";
import { singInValidation } from "../middlewares/signInValidateMiddleware.js";
import { authorization } from "../middlewares/authMiddleware.js";
import { validateUser } from "../middlewares/userValidate.js";

const router = Router();

router.post("/sign-up", signUpValidation, signUp);
router.post("/sign-in", singInValidation, signIn);
router.get("/users/me", authorization, validateUser, myUrls);
router.get("/ranking", getRanking);

export default router;