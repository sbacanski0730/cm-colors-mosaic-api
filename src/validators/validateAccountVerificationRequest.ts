import * as z from 'zod';
import Logger from '../utils/Logger';
import { NextFunction, Request, Response } from 'express';

const accountVerificationSchema = z.object({
	email: z //
		.string({ required_error: 'Property is required' }) //
		.email('Value has to be proper email'),
	verificationCode: z //
		.string({ required_error: 'Property is required' }),
});

const validateAccountVerificationRequest = (req: Request, res: Response, next: NextFunction) => {
	try {
		accountVerificationSchema.parse(req.body);
		next();
	} catch (err: any) {
		if (err instanceof z.ZodError) {
			Logger.error(err.issues);
			return res.status(500).send(Array(err.issues.map((e) => e.message)));
		}
		Logger.error(err);
		return res.status(500).send(err);
	}
};

export default validateAccountVerificationRequest;
