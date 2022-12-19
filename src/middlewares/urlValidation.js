import { connection } from '../database/db.js'
import {urlSchema} from '../models/urlSchema.js'

export async function urlValidation(req, res, next) {
	const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ','').trim()
    const urlInfo = req.body

    const validationErrors = urlSchema.validate(urlInfo, {
		abortEarly: false,
	}).error;

	if (validationErrors) {
		const errors = validationErrors.details.map((e) => e.message);
		return res.status(422).send(errors);
	}
    
    // Case headers not sent
    if (!token) {
        return res.sendStatus(401)
    }
    
    try {
        const sessionResponse = await connection.query(`
            SELECT
                *
            FROM
                sessions
            WHERE
                token = $1        
        `, [token])

        // Case token is invalid
        if (sessionResponse.rows.length === 0) {
            return res.sendStatus(401)
        }

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
	next();
}
