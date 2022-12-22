import { Router } from "express";
import { getUserInfo } from "../controllers/userController.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const userRouter = Router();

userRouter.get("/users/me", tokenValidation, getUserInfo);

export default userRouter;
