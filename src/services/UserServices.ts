import User from '../models/UserModel';
import IUser from '../interfaces/IUser';
import mongoose from 'mongoose';

class UserServices {
	private constructor() {}

	public static createUser = (input: Partial<IUser>): Promise<mongoose.HydratedDocument<IUser>> => {
		return User.create(input);
	};

	public static findUserById = (id: string) => {
		return User.findById(id);
	};

	// need proper type - refactor needed
	public static findUser = (query: any) => {
		return User.findOne(query);
	};
}

export default UserServices;
