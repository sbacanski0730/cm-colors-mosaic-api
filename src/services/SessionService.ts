import mongoose from 'mongoose';
import Session, { ISession } from '../models/SessionModel';

type SessionPayload = {
	user: mongoose.Types.ObjectId;
	userAgent: string | undefined;
};

class SessionService {
	private constructor() {}

	static createSession = async (payload: SessionPayload): Promise<mongoose.HydratedDocument<ISession>> => {
		return await Session.create(payload);
	};

	static findSession = async (query: mongoose.FilterQuery<ISession>): Promise<ISession | null> => {
		return await Session.findOne(query);
	};
}
export default SessionService;
