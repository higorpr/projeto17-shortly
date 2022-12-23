import { urlRepository } from "../repositories/urlRepository.js";

export async function checkUserUrl(req, res, next) {
	const { id } = res.locals.urlInfo;
	const userId = res.locals.userId;

	try {
		const urlResponse = await urlRepository.getUserUrls(userId, id);

		if (urlResponse.rows.length === 0) {
			return res.sendStatus(401);
		}
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}
	next();
}
