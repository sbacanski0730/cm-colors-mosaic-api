import config from 'config';
import * as nm from 'nodemailer';
import Logger from './Logger';
import _ from 'lodash';

type TransportOptions = {
	host: string;
	port: number;
	user: string;
	pass: string;
};

// Temporarily verification messages are stored in txt files

class Mailer {
	private transporterOptions = config.get<TransportOptions>('mailerTransporterOptions');
	private transporter: nm.Transporter = nm.createTransport({
		...this.transporterOptions,
		auth: {
			user: this.transporterOptions.user,
			pass: this.transporterOptions.pass,
		},
	});

	public constructor() {
		this.transporter.verify((error: Error | null) => {
			if (error) Logger.error(error);
		});
	}

	public sendMailPrototype = async (to: string, message: string): Promise<void> => {
		this.transporter.sendMail(
			{
				from: config.get('user'),
				to: to,
				subject: 'New Account Verification',
				html: message,
			},
			(err, info) => {
				if (err) {
					console.log(err);
					Logger.error(err);
					return;
				}
				Logger.info(`URL: ${nm.getTestMessageUrl(info)}`);
			}
		);
	};
}

export default Mailer;
