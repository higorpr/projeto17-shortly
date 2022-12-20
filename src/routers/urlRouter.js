import { Router } from "express";
import { getUrlById, shortenUrl } from "../controllers/urlController.js";
import { CheckUrlId } from "../middlewares/checkUrlId.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { urlValidation } from "../middlewares/urlValidation.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", tokenValidation, urlValidation, shortenUrl);
urlRouter.get("/urls/:id",CheckUrlId, getUrlById);

export default urlRouter;
