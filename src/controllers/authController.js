import bcryptjs from "bcryptjs";
import { v4 as uuidV4 } from "uuid";
import { authRepository } from "../repositories/authRepository.js";

export async function signup(req, res) {
	const { name, email, password } = res.locals.signupInfo;

	const salt = 10;
	const hashPassword = bcryptjs.hashSync(password, salt);

	try {
		await authRepository.addUser(name, email, hashPassword);
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
		const userSession = await authRepository.getUserSession(
			userInfo.userId
		);

		// Check if older user session exists
		// Deletes older sessions
		if (userSession.rows.length !== 0) {
			await authRepository.deleteUserSession(userInfo.userId);
		}

		// Inserts new session into DB
		await authRepository.addUserSession(userInfo.userId, token);
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}

	res.status(200).send(userResponse);
}
