import { Request, Response, NextFunction } from 'express';
import * as z from 'zod';
import Logger from '../utils/Logger';

const registerRequestSchema = z.object({
	email: z.string({ required_error: 'Email has to be provided' }).email('Not a valid email').toLowerCase(),
	password: z
		.string({ required_error: 'Password has to be provided' })
		.min(6, { message: 'Password has to be at last 6 characters long' }),
});

const validateRegisterRequest = (req: Request, res: Response, next: NextFunction) => {
	try {
		registerRequestSchema.parse(req.body);
		next();
	} catch (error: any) {
		if (error instanceof z.ZodError) {
			const errors: string[] = error.issues.map((e: any) => e.message);
			Logger.error(errors);
			return res.status(400).send(errors);
		}
	}
};

export default validateRegisterRequest;
