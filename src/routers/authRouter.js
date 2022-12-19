import { Router } from "express";
import { signin, signup } from "../controllers/authController.js";
import { signinValidation } from "../middlewares/signinValidation.js";
import { signupValidation } from "../middlewares/signupValidation.js";

const authRouter = Router();

authRouter.post("/signup", signupValidation, signup);
authRouter.post("/signin", signinValidation, signin);

export default authRouter;
