import bcryptjs from "bcryptjs";
import { signinSchema } from "../models/signinSchema.js";
import { authRepository } from "../repositories/authRepository.js";

export async function signinValidation(req, res, next) {
	const signinInfo = req.body;

	const validationErrors = signinSchema.validate(signinInfo, {
		abortEarly: false,
	}).error;

	if (validationErrors) {
		const errors = validationErrors.details.map((e) => e.message);
		return res.status(422).send(errors);
	}

	try {
		const userResponse = await authRepository.getUserByEmail(
			signinInfo.email
		);

		// Email not in DB (Nonexistant)
		if (userResponse.rows.length === 0) {
			return res.sendStatus(401);
		}

		const user = userResponse.rows[0];

		const storedPassword = user.password;
		const passwordCheck = bcryptjs.compareSync(
			signinInfo.password,
			storedPassword
		);

		if (!passwordCheck) {
			return res.status(401).send("Email ou senha incorretos");
		}

		console.log("Before delete: ", user);

		delete user.password;

		console.log("After delete: ", user);

		res.locals.userInfo = user;
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}

	next();
}
