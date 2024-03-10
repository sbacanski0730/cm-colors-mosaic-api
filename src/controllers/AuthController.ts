import { Request, Response } from 'express';
import Logger from '../utils/Logger';
import _ from 'lodash';
import UserServices from '../services/UserServices';
import IUser from '../interfaces/IUser';
import { Document, Error } from 'mongoose';
import mongoose from 'mongoose';

class AuthController {
	public constructor() {}

	public userRegisterHandler = async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body;
			await UserServices.createUser({ email, password });

			res.status(201).send('User created successfully ');
		} catch (error: any) {
			if (error.code === 11000) {
				res.status(400).send('This user already exist');
			}
			res.status(501).send(error.errors);
		}
	};
}

export default AuthController;
