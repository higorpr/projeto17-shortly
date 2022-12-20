import { connection } from "../database/db.js";

export async function CheckUrlId(req, res, next) {
	const { id } = req.params;

	// Check if id exists
	try {
		const urlResponse = await connection.query(
			`
            SELECT
                id, short_url AS "shortUrl", url
            FROM
                urls
            WHERE
                id =$1
        `,
			[id]
		);

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
