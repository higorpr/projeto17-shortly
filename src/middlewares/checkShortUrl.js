import { connection } from "../database/db.js";

export async function checkShortUrl(req, res, next) {
	const { shortUrl } = req.params;

	// Check if id exists
	try {
		const urlResponse = await connection.query(
			`
            SELECT
                id AS "urlId", url
            FROM
                urls
            WHERE
                short_url =$1
        `,
			[shortUrl]
		);

		if (urlResponse.rows.length === 0) {
			return res.sendStatus(404);
		}
		
		const { url, urlId } = urlResponse.rows[0];

		res.locals.url = url;
		res.locals.urlId = urlId;

	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
	next();
}
