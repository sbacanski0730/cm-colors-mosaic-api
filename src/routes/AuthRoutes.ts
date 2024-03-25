import AuthController from '../controllers/AuthController';
import { Application } from 'express';
import validateRegisterRequest from '../validators/validateRegisterRequest';
import validateAccountVerificationRequest from '../validators/validateAccountVerificationRequest';
import validateLoginRequest from '../validators/validateLoginRequest';

class AuthRoutes {
	private authController = new AuthController();

	public constructor() {}

	public createAuthRoutes = (app: Application) => {
		app.route('/api/auth/register') //
			.post(
				//
				validateRegisterRequest,
				this.authController.userRegisterHandler
			);
		// user id and verification code should be inside params
		// endpoint route needed
		app.route('/api/auth/verification') //
			.post(
				//
				validateAccountVerificationRequest,
				this.authController.userAccountVerificationHandler
			);
		app.route('/api/auth/login') //
			.post(
				//
				validateLoginRequest,
				this.authController.userLoginHandler
			);
	};
}

export default AuthRoutes;
