import { Request, Response } from 'express';
import config from 'config';
import UserServices from '../services/UserServices';
import Mailer from '../utils/Mailer';
import _ from 'lodash';
import Logger from '../utils/Logger';
import mongoose, { Document } from 'mongoose';
import { IUser, IUserModel } from '../models/UserModel';
import Session from '../models/SessionModel';
import SessionService from '../services/SessionService';
import Jwt from '../utils/Jwt';

class AuthController {
	public constructor() {}

	public userRegisterHandler = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { email, password } = req.body;

			const user = await UserServices.createUser({ email, password });

			const mailer = new Mailer();

			// NOTE: prototype
			// NOTE: all mailer functionality is a prototype
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
			// REFACTOR: this data (data, verificationCode) should be in params
			const { email, verificationCode } = req.body;

			const user = await UserServices.findUser({ email });

			if (!user) {
				return res.status(404).send('User not found');
			}

			if (user.verified) {
				return res.status(501).send('User already verified');
			}

			if (user.verificationCode !== verificationCode) {
				return res.status(401).send('User imposable to verification');
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

	public userLoginHandler = async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body;

			const user = await UserServices.findUser({ email });

			if (!user) return res.status(400).send('Wrong credentials');

			if (!user.verified) return res.status(400).send('User needs to be verified');

			if (!(await user.comparePasswords(password))) return res.status(400).send('Wrong credentials');

			// DOUBT: figure it out what to do when session with given user and user-agent already exist
			// DOUBT: is this resolve enough
			if (await SessionService.findSession({ user: user._id, userAgent: req.headers['user-agent'] }))
				return res.status(500).send('This session already exist');

			const session = await SessionService.createSession({
				user: user._id,
				userAgent: req.headers['user-agent'],
			});

			const accessToken = Jwt.createAccessToken({ userId: user._id, userAgent: req.headers['user-agent'] });
			const refreshToken = Jwt.createRefreshToken({ sessionId: session._id });

			return res.status(200).send({ accessToken, refreshToken });
		} catch (error) {
			Logger.error(error);
			return res.status(500).send(error);
		}
	};
}

export default AuthController;
