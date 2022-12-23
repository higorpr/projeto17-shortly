import { urlSchema } from "../models/urlSchema.js";

export function urlValidation(req, res, next) {
	const urlInfo = req.body;

	const validationErrors = urlSchema.validate(urlInfo, {
		abortEarly: false,
	}).error;

	if (validationErrors) {
		const errors = validationErrors.details.map((e) => e.message);
		return res.status(422).send(errors);
	}

	res.locals.url = urlInfo.url;

	next();
}
