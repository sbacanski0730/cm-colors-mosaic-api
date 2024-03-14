import AuthController from '../controllers/AuthController';
import { Application } from 'express';
import validateRegisterRequest from '../validators/validateRegisterRequest';
import validateAccountVerificationRequest from '../validators/validateAccountVerificationRequest';
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

		app.route('/api/auth/verification') //
			.post(
				//
				validateAccountVerificationRequest,
				this.authController.userAccountVerificationHandler
			);
	};
}

export default AuthRoutes;
