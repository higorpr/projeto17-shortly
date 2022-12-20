import { nanoid } from "nanoid";
import { connection } from "../database/db.js";

export async function shortenUrl(req, res) {
	const url = res.locals.url;
	const userId = res.locals.userId;
	const shortUrl = nanoid(10);
	const urlVisitCount = 0;
	const urlArr = [userId, url, shortUrl, urlVisitCount];

	try {
		const userUrlResponse = await connection.query(
			`
            SELECT
                url
            FROM
                urls
            WHERE
                user_id = $1
        `,
			[userId]
		);

		const userUrls = userUrlResponse.rows.map((u) => u.url);

		if (userUrls.includes(url)) {
			return res.status(409).send("Url already stored");
		}

		await connection.query(
			`
        INSERT INTO
            urls (user_id, url, short_url, url_visit_count)
        VALUES
            ($1, $2, $3, $4);
        `,
			urlArr
		);
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}

	res.status(201).send({ shortUrl: shortUrl });
}

export async function getUrlById(req, res) {
	const response = res.locals.responseBody;
	res.status(200).send(response);
}
