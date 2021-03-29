import express from 'express';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import path from 'path';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import sessions from 'client-sessions';
import helmet from 'helmet';
require('dotenv').config();

const { SESSION_SECRET, NODE_ENV, CI } = process.env;
const isTestEnv = process.env.NODE_ENV === 'test';

const app = express();
require('./database'); // Establishes db connection
import(
	path.join(__dirname, 'utils', 'user-expirations')
).then((userExpirations) => userExpirations.checkExpirations()); // Defines and starts agenda (job: check user expirations at 00:00 daily)

// Settings
app.set('port', process.env.PORT || 2017);
app.set('favicon', path.join(__dirname, '../favicon.ico'));
app.set('json spaces', 2);

// Middlewares
app.use(
	sessions({
		cookieName: 'proc',
		secret: SESSION_SECRET as string,
		duration: 9999 * 24 * 60 * 60 * 1000,
		cookie: {
			httpOnly: true,
			secure: false
		}
	})
);
app.use(
	sessions({
		cookieName: 'tst',
		secret: SESSION_SECRET as string,
		duration: 24 * 60 * 60 * 1000,
		cookie: {
			httpOnly: true,
			secure: false
		}
	})
);
app.use(helmet());
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'", 'https://accounts.google.com/'],
			connectSrc: ["'self'", 'https://graph.facebook.com/'],
			imgSrc: ["'self'", 'data:', 'https://www.facebook.com/'],
			styleSrc: ["'self'", "'unsafe-inline'"],
			objectSrc: ["'none'"],
			scriptSrc: [
				"'self'",
				"'unsafe-inline'",
				'https://connect.facebook.net/',
				'https://apis.google.com/'
			]
		}
	})
);
app.use(favicon(app.get('favicon')));
app.use(cors({ origin: ['http://127.0.0.1:3000', 'https://127.0.0.1:3000'] }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (!isTestEnv) {
	app.use(morgan('dev'));
}

// Routes
app.use('/user', userRoutes);

if (isTestEnv && CI) {
	console.log = () => 0;
}

// Static files
if (NODE_ENV === 'production' || isTestEnv) {
	const clientBuildPath = path.resolve(path.join('..', 'client', 'build'));
	app.use(express.static(clientBuildPath));
	app.get('*', (_req, res) => {
		res.sendFile(path.join(clientBuildPath, 'index.html'));
	});
}

export const server = app.listen(app.get('port'), () =>
	console.log('\x1b[32m%s\x1b[0m', `Server running :${app.get('port')}`)
);

require('./utils/sockets');
