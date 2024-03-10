import { Request, Response } from 'express';
import UserServices from '../services/UserServices';

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
