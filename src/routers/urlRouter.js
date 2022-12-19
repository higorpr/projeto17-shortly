import { Router } from "express";
import { shortenUrl } from "../controllers/urlController.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { urlValidation } from "../middlewares/urlValidation.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten",tokenValidation, urlValidation, shortenUrl);

export default urlRouter;
