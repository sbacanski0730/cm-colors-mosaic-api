import { Request, Response } from 'express';
import config from 'config';
import UserServices from '../services/UserServices';
import Mailer from '../utils/Mailer';
import Logger from '../utils/Logger';
import _ from 'lodash';

class AuthController {
	public constructor() {}

	public userRegisterHandler = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { email, password } = req.body;

			const user = await UserServices.createUser({ email, password });

			const mailer = new Mailer();

			// just prototype
			const message = `
			<head>
				<style>
					*{
						color: red;
					}
				</style>
			</head>
			<body>
				<h1>
					Account Verification Page
				</h1>
				<p>Click here </p><a href='${config.get('baseUrl')}'>link</a>
			</body>
			`;

			await mailer.sendMailPrototype(user.email, message);

			return res.status(201).send('User created successfully');
		} catch (error: any) {
			if (error.code === 11000) {
				return res.status(400).send('This user already exist');
			}
			Logger.error(error);
			return res.status(501).send(error);
		}
	};

	public userAccountVerificationHandler = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { email, verificationCode } = req.body;

			const user = await UserServices.findUser({ email });

			if (!user) {
				return res.status(404).send('User not found');
			}

			if (user.verified) {
				return res.status(501).send('User already verified');
			}

			if (user.verificationCode !== verificationCode) {
				return res.send('User imposable to verification');
			}

			if (user.verificationCode === verificationCode) {
				user.verified = true;
				await user.save();
				return res.status(200).send('User verified');
			}
			return res.status(500).send('Unknown problem');
		} catch (err) {
			Logger.error(err);
			return res.send(err).status(500);
		}
	};
}

export default AuthController;
