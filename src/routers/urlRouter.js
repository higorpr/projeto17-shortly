import { Router } from "express";
import {
	deleteUrl,
	getUrlById,
	openUrl,
	shortenUrl,
} from "../controllers/urlController.js";
import { checkShortUrl } from "../middlewares/checkShortUrl.js";
import { CheckUrlId } from "../middlewares/checkUrlId.js";
import { checkUserUrl } from "../middlewares/checkUserUrl.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { updateVisitCount } from "../middlewares/updateVisitCount.js";
import { urlValidation } from "../middlewares/urlValidation.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", tokenValidation, urlValidation, shortenUrl);
urlRouter.get("/urls/:id", CheckUrlId, getUrlById);
urlRouter.get(
	"/urls/open/:shortUrl",
	checkShortUrl,
	updateVisitCount,
	openUrl
);
urlRouter.delete(
	"/urls/:id",
	tokenValidation,
	CheckUrlId,
	checkUserUrl,
	deleteUrl
);

export default urlRouter;
