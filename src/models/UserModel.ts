import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import IUser from '../interfaces/IUser';
import { nanoid } from 'nanoid';

const UserSchema = new mongoose.Schema<IUser>(
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
UserSchema.pre('save', async function (next) {
	const password = await bcrypt.hash(this.password, 10);
	this.password = password;
	next();
});

const User = mongoose.model('User', UserSchema);

export default User;
