import { urlRepository } from "../repositories/urlRepository.js";

export async function CheckUrlId(req, res, next) {
	const { id } = req.params;
	
	if (!Number.isInteger(Number(id))) {
		return res.sendStatus(404);
	}

	// Check if url id exists
	try {
		const urlResponse = await urlRepository.getUrlInfo(id);
		
		if (urlResponse.rows.length === 0) {
			return res.sendStatus(404);
		}

		res.locals.urlInfo = urlResponse.rows[0];
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}

	next();
}
