import config from 'config';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

type AccessTokenPayload = {
	userId: mongoose.Types.ObjectId;
	// DOUBT: is it possible to not adding 'undefined' as a type?
	// DOUBT: will it be better to not using undefined? \/
	userAgent: string | undefined;
};

type RefreshTokenPayload = {
	// DOUBT: what to give to refresh token as payload?
	// DOUBT: why not and what are other options?
	sessionId: mongoose.Types.ObjectId;
};

const ACCESS_TOKEN_EXPIRATION_TIME: string = '1m';
const REFRESH_TOKEN_EXPIRATION_TIME: string = '1h';

class Jwt {
	// DOUBT: if I left here private static properties will it be better than creating new variable inside static method?
	private static accessTokenPrivateKey: string = config.get('accessTokenPrivateKey');
	private static accessTokenPublicKey: string = config.get('accessTokenPublicKey');
	private static refreshTokenPrivateKey: string = config.get('refreshTokenPrivateKey');
	private static refreshTokenPublicKey: string = config.get('refreshTokenPublicKey');

	static createAccessToken = (payload: AccessTokenPayload): string => {
		const accessToken = jwt.sign(payload, this.accessTokenPrivateKey, {
			algorithm: 'RS256',
			expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
		});
		return accessToken;
	};

	static createRefreshToken = (payload: RefreshTokenPayload): string => {
		const refreshToken = jwt.sign(payload, this.refreshTokenPrivateKey, {
			algorithm: 'RS256',
			expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
		});
		return refreshToken;
	};

	// NOTE: verification takes publicKey
	static verifyAccessToken = (accessToken: string) => {};

	static verifyRefreshToken = (refreshToken: string) => {};
}

export default Jwt;
