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

		return res.status(200).send(userUrlsInfo);
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}
}

export async function ranking(req, res) {
	try {
		const response = await connection.query(`
            SELECT
                u.id AS "id", 
                u.name AS "name", 
                COUNT(ur.id) AS "linksCount", 
                COALESCE(SUM(ur.url_visit_count),0) AS "visitCount"
            FROM
                users u LEFT JOIN urls ur 
            ON 
                u.id = ur.user_id
            GROUP BY
                u.id
            ORDER BY
                "linksCount" DESC
            LIMIT 10;
        `);
		const ranking = response.rows;
		return res.status(200).send(ranking);
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}
}
