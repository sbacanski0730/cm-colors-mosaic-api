import { Request, Response, NextFunction } from 'express';
import * as z from 'zod';
import Logger from '../utils/Logger';

const loginRequestSchema = z.object({
	email: z.string({ required_error: 'Email has to be provided' }).email('Value is not a proper email'),
	password: z.string({ required_error: 'Password has to be provided' }),
});

const validateLoginRequest = (req: Request, res: Response, next: NextFunction) => {
	try {
		loginRequestSchema.parse(req.body);
		next();
	} catch (err) {
		if (err instanceof z.ZodError) {
			Logger.error(err);
			return res.status(400).send(err);
		}
		Logger.error(err);
		return res.status(501).send('Request error');
	}
};

export default validateLoginRequest;
