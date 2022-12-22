import { connection } from "../database/db.js";

export async function getUserInfo(req, res) {
	const userId = res.locals.userId;

	try {
		const response = await connection.query(
			`
            SELECT 
                u.id, u.name, SUM(ur.url_visit_count) AS "visitCount",
                ARRAY_AGG(json_build_object('id', ur.id, 'shortUrl', ur.short_url, 'url', ur.url, 'visitCount', ur.url_visit_count)) AS "shortenedUrls"            
            FROM
                urls ur JOIN users u
            ON
                ur.user_id = u.id
            WHERE
                ur.user_id = $1
            GROUP BY
                u.id
        `,
			[userId]
		);

		const userUrlsInfo = response.rows[0];
		res.status(200).send(userUrlsInfo);
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}
}
