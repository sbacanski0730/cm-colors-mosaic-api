import { Application } from 'express';
import AppController from '../controllers/AppController';
import AuthRoutes from './AuthRoutes';

class AppRoutes {
	private authRoutes = new AuthRoutes();

	public constructor() {}

	public createRoutes = (app: Application) => {
		this.authRoutes.createAuthRoutes(app);
	};
}

export default AppRoutes;
