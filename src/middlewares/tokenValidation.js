import { connection } from "../database/db.js";

export async function tokenValidation(req, res, next) {
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer ", "").trim();
	let userId;
	
	// Case headers not sent
	if (!token) {
		return res.sendStatus(401);
	}

	try {
		const sessionResponse = await connection.query(
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

		// Case token is invalid
		if (sessionResponse.rows.length === 0) {
			return res.sendStatus(401);
		}

		// Get user_id from token
		userId = sessionResponse.rows[0].user_id;
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}

	res.locals.userId = userId;
	next();
}
