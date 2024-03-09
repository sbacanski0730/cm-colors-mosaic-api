import AuthController from '../controllers/AuthController';
import { Application } from 'express';
import authController from '../controllers/AuthController';

class AuthRoutes {
	private authController = new AuthController();

	public constructor() {}

	public createAuthRoutes = (app: Application) => {
		app.route('/api/auth/register').post(this.authController.userRegisterHandler);
	};
}

export default AuthRoutes;
