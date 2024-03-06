import express, { Application } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import AppRoutes from './routes/AppRoutes';
import Logger from './utils/Logger';

class App {
	private port: string = config.get('port');

	private app: Application = express();
	private appRoutes: AppRoutes = new AppRoutes();

	public constructor() {
		this.createRoutes();
		this.listen();
	}

	private createRoutes = () => {
		this.appRoutes.createRoutes(this.app);
	};

	private listen = () => {
		this.app.listen(this.port, () => {
			Logger.info(`Server is listing at port ${this.port}`);
		});
	};
}

export default App;
