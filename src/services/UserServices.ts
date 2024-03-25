import User, { IUser, IUserModel, IUserMethods } from '../models/UserModel';
import mongoose from 'mongoose';

class UserServices {
	private constructor() {}

	public static createUser = (input: Partial<IUser>): Promise<mongoose.HydratedDocument<IUser>> => {
		return User.create(input);
	};

	public static findUserById = async (id: string): Promise<IUser | null> => {
		return await User.findById(id);
	};

	public static findUser = async (query: mongoose.FilterQuery<IUser>): Promise<(IUser & IUserMethods) | null> => {
		return User.findOne(query);
	};
}

export default UserServices;
