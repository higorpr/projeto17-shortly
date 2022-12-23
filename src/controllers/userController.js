import { userRepository } from "../repositories/userRepository.js";

export async function getUserInfo(req, res) {
	const userId = res.locals.userId;

	try {
		const response = await userRepository.getUserUrlsInfo(userId);

		const userUrlsInfo = response.rows[0];

		return res.status(200).send(userUrlsInfo);
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}
}

export async function ranking(req, res) {
	try {
		const response = await userRepository.getRanking();
		const ranking = response.rows;
		return res.status(200).send(ranking);
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}
}
