import mongoose from 'mongoose';
import IUser from '../models/UserModel';

export interface ISession extends mongoose.Document {
	user: mongoose.Types.ObjectId;
	userAgent: string;
	valid: boolean;
}

const sessionSchema = new mongoose.Schema<ISession>({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	userAgent: {
		type: String,
	},
	valid: { type: Boolean, default: true },
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
