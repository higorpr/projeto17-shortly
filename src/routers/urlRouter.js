import { Router } from "express";
import { shortenUrl } from "../controllers/urlController.js";
import { urlValidation } from "../middlewares/urlValidation.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", urlValidation, shortenUrl);

export default urlRouter;
