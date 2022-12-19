import joi from 'joi'

export const signinSchema = joi.object({
    name:joi.string().email().required(),
    password: joi.string().required()
})