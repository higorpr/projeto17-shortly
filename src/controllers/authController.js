import bcryptjs from "bcryptjs";
import { connection } from "../database/db.js";

export async function signup(req, res) {
	const { name, email, password } = res.locals.signupInfo;

	const salt = 10;
	const hashPassword = bcryptjs.hashSync(password, salt);

	try {
		const visitCount = 0;
		const userArr = [name, email, hashPassword, visitCount];
		connection.query(
			`
			INSERT INTO
				users (name, email, password, user_url_visit_count)
			VALUES
				($1, $2, $3, $4)
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

	res.sendStatus(200)
}
