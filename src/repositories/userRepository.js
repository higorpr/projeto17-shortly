import { connection } from "../database/db.js";

async function getUserUrlsInfo(userId) {
	return connection.query(
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
}

async function getRanking() {
	return connection.query(`
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
}

export const userRepository = { getUserUrlsInfo, getRanking };
