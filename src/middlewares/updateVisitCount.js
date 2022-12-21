import { connection } from "../database/db.js";

export async function updateVisitCount(req, res, next) {
	const urlId = res.locals.urlId;

	try {
		await connection.query(
			`
            UPDATE
                urls
            SET
                url_visit_count = url_visit_count + 1
            WHERE
                id = $1
        `,
			[urlId]
		);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
	next();
}
