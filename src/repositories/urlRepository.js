import { connection } from "../database/db.js";

async function getSession(token) {
	return connection.query(
		`
        SELECT
            *
        FROM
            sessions
        WHERE
            token = $1        
    `,
		[token]
	);
}

async function getUrls(userId) {
	return connection.query(
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
}

async function addUrl(userId, url, shortUrl, urlVisitCount) {
	const urlArr = [userId, url, shortUrl, urlVisitCount];

	return connection.query(
		`
    INSERT INTO
        urls (user_id, url, short_url, url_visit_count)
    VALUES
        ($1, $2, $3, $4);
    `,
		urlArr
	);
}

async function deleteUrl(urlId) {
	return connection.query(
		`
        DELETE FROM
            urls
        WHERE
            id = $1
    `,
		[urlId]
	);
}

async function getUrlInfo(urlId) {
	return connection.query(
		`
        SELECT
            id, short_url AS "shortUrl", url
        FROM
            urls
        WHERE
            id =$1
    `,
		[urlId]
	);
}

async function getShortUrl(shortUrl) {
	return connection.query(
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
}

async function updateViewCount(urlId) {
	return connection.query(
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
}

async function getUserUrls(userId, id) {
	return connection.query(
		`
        SELECT
            *
        FROM
            urls
        WHERE
            user_id = $1 AND id = $2
    `,
		[userId, id]
	);
}

export const urlRepository = {
	getSession,
	getUrls,
	addUrl,
	deleteUrl,
	getUrlInfo,
	getShortUrl,
	updateViewCount,
	getUserUrls,
};
