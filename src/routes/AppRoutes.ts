import { Application } from 'express';
import AppController from '../controllers/AppController';

class AppRoutes {
	private appController = new AppController();

	public constructor() {}

	public createRoutes = (app: Application) => {
		app.route('/').get(this.appController.helloWorldHandler);
	};
}

export default AppRoutes;
