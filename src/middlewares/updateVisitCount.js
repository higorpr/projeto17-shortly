import { urlRepository } from "../repositories/urlRepository.js";

export async function updateVisitCount(req, res, next) {
	const urlId = res.locals.urlId;

	try {
		await urlRepository.updateViewCount(urlId);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
	next();
}
