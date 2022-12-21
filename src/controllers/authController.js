import bcryptjs from "bcryptjs";
import { v4 as uuidV4 } from "uuid";
import { connection } from "../database/db.js";

export async function signup(req, res) {
	const { name, email, password } = res.locals.signupInfo;

	const salt = 10;
	const hashPassword = bcryptjs.hashSync(password, salt);

	try {
		const visitCount = 0;
		const userArr = [name, email, hashPassword];
		connection.query(
			`
			INSERT INTO
				users (name, email, password)
			VALUES
				($1, $2, $3)
		`,
			userArr
		);
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}
	res.sendStatus(201);
}

export async function signin(req, res) {
	const token = uuidV4();
	const userInfo = res.locals.userInfo;

	const userResponse = { ...userInfo, token };
	delete userResponse.userId;

	try {
		// Gets user session information
		const userSession = await connection.query(
			`
			SELECT
				*
			FROM
				sessions
			WHERE
				user_id = $1
		`,
			[userInfo.userId]
		);

		// Check if older user session exists
		// Deletes older sessions
		if (userSession.rows.length !== 0) {
			await connection.query(
				`
				DELETE FROM
					sessions
				WHERE
					user_id = $1
			`,
				[userInfo.userId]
			);
		}

		// Inserts new session into DB
		const sessionArr = [userInfo.userId, token];

		await connection.query(
			`
			INSERT INTO
				sessions (user_id, token)
			VALUES
				($1, $2)
		`,
			sessionArr
		);
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}

	res.status(200).send(userResponse);
}
