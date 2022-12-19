import { Router } from "express";
import { signup } from "../controllers/authController.js";
import { signupValidation } from "../middlewares/signupValidation.js";

const authRouter = Router();

authRouter.post("/signup", signupValidation, signup);

export default authRouter;