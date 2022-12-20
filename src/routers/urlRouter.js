import { Router } from "express";
import { deleteUrl, getUrlById, shortenUrl } from "../controllers/urlController.js";
import { CheckUrlId } from "../middlewares/checkUrlId.js";
import { checkUserUrl } from "../middlewares/checkUserUrl.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { urlValidation } from "../middlewares/urlValidation.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", tokenValidation, urlValidation, shortenUrl);
urlRouter.get("/urls/:id",CheckUrlId, getUrlById);
urlRouter.delete('/urls/:id',tokenValidation, CheckUrlId, checkUserUrl, deleteUrl)

export default urlRouter;
