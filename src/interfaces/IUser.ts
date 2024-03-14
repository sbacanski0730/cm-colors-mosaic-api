import mongoose from 'mongoose';

interface IUser extends mongoose.Document {
	email: string;
	password: string;
	verified: boolean;
	verificationCode: string;
}

export default IUser;
