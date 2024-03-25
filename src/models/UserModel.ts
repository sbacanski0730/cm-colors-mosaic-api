import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

export interface IUser extends mongoose.Document {
	email: string;
	password: string;
	verified: boolean;
	verificationCode: string;
}

export interface IUserMethods {
	comparePasswords(password: string): Promise<boolean>;
}

export type IUserModel = mongoose.Model<IUser, {}, IUserMethods>;

const UserSchema = new mongoose.Schema<IUser, IUserModel, IUserMethods>(
	{
		email: {
			type: String,
			lowercase: true,
			required: true,
			unique: true,
			match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Provide proper email'],
		},
		password: {
			type: String,
			required: true,
			minLength: [6, 'password has to be al last 6 characters long'],
		},
		verified: {
			type: Boolean,
			default: false,
		},
		verificationCode: {
			type: String,
			default: nanoid(),
		},
	},
	{ timestamps: true }
);

// refactor - it change password every time when 'save'
UserSchema.pre<IUser>('save', async function (next: mongoose.CallbackWithoutResultAndOptionalError): Promise<void> {
	const password = await bcrypt.hash(this.password, 10);
	this.password = password;
	next();
});

UserSchema.methods.comparePasswords = async function (password: string): Promise<boolean> {
	return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;
