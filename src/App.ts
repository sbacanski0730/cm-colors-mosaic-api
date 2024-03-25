import express, { Application } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import AppRoutes from './routes/AppRoutes';
import Logger from './utils/Logger';
import mongoose from 'mongoose';

class App {
	private port: string = config.get('port');

	private app: Application = express();
	private appRoutes: AppRoutes = new AppRoutes();

	public constructor() {
		this.config();
		this.createRoutes();
		this.connectDb();
		this.listen();
	}
	// TODO: add validation to for login requests,
	// login request should validate that user-agent are not undefined
	// proper working of the application require user-agent proper value
	// DOUBT: to ^ - if validation has been already created, do access token type needs undefined as a type of user-agent?

	private config = () => {
		this.app.use(express.json());
	};

	private createRoutes = () => {
		this.appRoutes.createRoutes(this.app);
	};

	private listen = () => {
		this.app.listen(this.port, () => {
			Logger.info(`Server is listing at port ${this.port}`);
		});
	};

	private connectDb = () => {
		mongoose
			.connect(config.get('dbUrl'))
			.then(() => Logger.info('Database Connected'))
			.catch((e: any) => Logger.error(e.message));
	};
}

export default App;
