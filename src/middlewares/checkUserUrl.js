import { connection } from "../database/db.js";

export async function checkUserUrl(req, res, next) {
	const { id } = res.locals.urlInfo;
	const userId = res.locals.userId;

    try {
        const urlResponse = await connection.query(`
            SELECT
                *
            FROM
                urls
            WHERE
                user_id = $1 AND id = $2
        `, [userId,id])

        if (urlResponse.rows.length === 0){
            return res.sendStatus(401)
        }
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
	next();
}
