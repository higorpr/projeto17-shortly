import { connection } from "../database/db.js";
import { signinSchema } from "../models/signinSchema.js";

export async function signinValidation(req, res, next) {
    const signinInfo = req.body

    const validationErrors = signinSchema.validate(signinInfo, {
		abortEarly: false,
	}).error;

	if (validationErrors) {
		const errors = validationErrors.details.map((e) => e.message);
		return res.status(422).send(errors);
	}

    next()
}