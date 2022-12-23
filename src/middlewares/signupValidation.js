import { signupSchema } from "../models/signupSchema.js";
import { authRepository } from "../repositories/authRepository.js";

export async function signupValidation(req, res, next) {
	const signupInfo = req.body;

	const validationErrors = signupSchema.validate(signupInfo, {
		abortEarly: false,
	}).error;

	if (validationErrors) {
		const errors = validationErrors.details.map((e) => e.message);
		return res.status(422).send(errors);
	}

	try {
		const response = await authRepository.getUserEmails();

		const user_emails = response.rows.map((r) => r.email);

		if (user_emails.includes(signupInfo.email)) {
			return res.sendStatus(409);
		}
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}

	delete signupInfo.confirmPassword;
	res.locals.signupInfo = signupInfo;
	
	next();
}
