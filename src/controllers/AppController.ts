import { Request, Response } from 'express';
class AppController {
	public constructor() {}

	public helloWorldHandler = (_: Request, res: Response) => {
		res.send('Hello World').status(200);
	};
}

export default AppController;
