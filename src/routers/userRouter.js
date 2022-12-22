import { Router } from "express";
import { getUserInfo, ranking } from "../controllers/userController.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const userRouter = Router();

userRouter.get("/users/me", tokenValidation, getUserInfo);
userRouter.get("/ranking", ranking);

export default userRouter;
