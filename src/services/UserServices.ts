import User from '../models/UserModel';
import IUser from '../interfaces/IUser';

class UserServices {
	private constructor() {}

	public static createUser = (input: Partial<IUser>): Promise<IUser> => {
		return User.create(input);
	};
}

export default UserServices;
