// https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/#logging-in-an-express-application-using-winston-and-morgan
import winston from 'winston';
import config from 'config';

const { combine, timestamp, json, cli, colorize, align, printf } = winston.format;

const customFormat = combine(
	winston.format((info) => {
		info.level = info.level.toUpperCase();
		return info;
	})(),
	winston.format.colorize({
		all: true,
	}),
	winston.format.timestamp({
		format: 'HH:mm DD-MM-YYYY',
	}),
	winston.format.cli({
		colors: { info: 'yellow', error: 'red', warn: 'cyan', timestamp: 'red' },
	}),
	winston.format.printf((info) => {
		return `${info.timestamp} ${info.level} ${info.message}`;
	})
);

const Logger = winston.createLogger({
	level: config.get('logLevel') || 'info',
	format: customFormat,
	transports: new winston.transports.Console(),
});

export default Logger;
