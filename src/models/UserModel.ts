import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import IUser from '../interfaces/IUser';

const UserSchema = new mongoose.Schema<IUser>(
	{
		email: {
			type: String,
			lowercase: true,
			required: true,
			unique: true,
			match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Provide proper email'],
		},
		password: { type: String, required: true, minLength: [6, 'password has to be al last 6 characters long'] },
	},
	{ timestamps: true }
);

UserSchema.pre('save', async function (next) {
	const password = await bcrypt.hash(this.password, 10);
	this.password = password;
	next();
});

const User = mongoose.model('User', UserSchema);

export default User;
