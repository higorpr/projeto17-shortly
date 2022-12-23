import { nanoid } from "nanoid";
import { urlRepository } from "../repositories/urlRepository.js";

export async function shortenUrl(req, res) {
	const url = res.locals.url;
	const userId = res.locals.userId;
	const shortUrl = nanoid(10);
	const urlVisitCount = 0;

	try {
		const userUrlResponse = await urlRepository.getUrls(userId);

		const userUrls = userUrlResponse.rows.map((u) => u.url);

		if (userUrls.includes(url)) {
			return res.status(409).send("Url already stored");
		}

		await urlRepository.addUrl(userId, url, shortUrl, urlVisitCount);
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}

	res.status(201).send({ shortUrl: shortUrl });
}

export async function getUrlById(req, res) {
	const response = res.locals.urlInfo;
	res.status(200).send(response);
}

export async function deleteUrl(req, res) {
	const { id } = res.locals.urlInfo;

	try {
		await urlRepository.deleteUrl(id);
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}
	res.sendStatus(204);
}

export async function openUrl(req, res) {
	const url = res.locals.url;

	res.redirect(302, url);
}
