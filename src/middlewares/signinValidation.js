import bcryptjs from "bcryptjs";
import { connection } from "../database/db.js";
import { signinSchema } from "../models/signinSchema.js";

export async function signinValidation(req, res, next) {
	const signinInfo = req.body;
	let userInfo = {};

	const validationErrors = signinSchema.validate(signinInfo, {
		abortEarly: false,
	}).error;

	if (validationErrors) {
		const errors = validationErrors.details.map((e) => e.message);
		return res.status(422).send(errors);
	}

	try {
		const userResponse = await connection.query(
			`
            SELECT
                *
            FROM
                users
            WHERE
                email = $1
        `,
			[signinInfo.email]
		);

		// Email not in DB (Nonexistant)
		if (userResponse.rows.length === 0) {
			return res.sendStatus(401);
		}

		const storedPassword = userResponse.rows[0].password;
		const passwordCheck = bcryptjs.compareSync(
			signinInfo.password,
			storedPassword
		);

		if (!passwordCheck) {
			return res.status(401).send("Email ou senha incorretos");
		}

		userInfo = {
			userId : userResponse.rows[0].id,
			name: userResponse.rows[0].name,
			email: userResponse.rows[0].email,
		};
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}
	
	res.locals.userInfo = userInfo;
	next();
}
