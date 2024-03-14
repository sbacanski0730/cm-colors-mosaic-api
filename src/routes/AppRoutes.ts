import { Application } from 'express';
import AuthRoutes from './AuthRoutes';

class AppRoutes {
	private authRoutes = new AuthRoutes();

	public constructor() {}

	public createRoutes = (app: Application) => {
		this.authRoutes.createAuthRoutes(app);
	};
}

export default AppRoutes;
