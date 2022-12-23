import { connection } from "../database/db.js";

async function getUserEmails() {
	return connection.query(`
    SELECT
        email
    FROM
        users
`);
}

async function getUserSession(userId) {
	return connection.query(
		`
        SELECT
            *
        FROM
            sessions
        WHERE
            user_id = $1
    `,
		[userId]
	);
}

async function deleteUserSession(userId) {
	return connection.query(
		`
        DELETE FROM
            sessions
        WHERE
            user_id = $1
    `,
		[userId]
	);
}

async function addUserSession(userId, token) {
	return connection.query(
		`
        INSERT INTO
            sessions (user_id, token)
        VALUES
            ($1, $2)
    `,
		[userId, token]
	);
}

async function addUser(name, email, password) {
	return connection.query(
		`
        INSERT INTO
            users (name, email, password)
        VALUES
            ($1, $2, $3)
    `,
		[name, email, password]
	);
}

async function getUserByEmail(email) {
	return connection.query(
        `
        SELECT
            id AS "userId", name, password
        FROM
            users
        WHERE
            email = $1
    `,
        [email]
    );
}

export const authRepository = {
	getUserEmails,
	getUserSession,
	deleteUserSession,
	addUserSession,
	addUser,
	getUserByEmail,
};
