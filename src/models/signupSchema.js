import Joi from "joi";
import joi from "joi";

export const signupSchema = joi.object({
	name: joi.string().min(3).required().label("name"),
	email: joi.string().email().required().label("email"),
	password: joi.string().label("password").required(),
	confirmPassword: joi
		.any()
		.equal(Joi.ref("password"))
		.required()
		.messages({ "any.only": "{{#label}} does not match}" }),
});
