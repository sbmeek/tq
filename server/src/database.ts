import mongoose, { ConnectionOptions } from 'mongoose';
require('dotenv').config();

const {
	DB_CONNECTION_STRING,
	DB_USERNAME,
	DB_USERPWD,
	DB_NAME,
	DOCKERIZED_DB_URI
} = process.env;

const dbStr =
	DB_CONNECTION_STRING !== undefined
		? (DB_CONNECTION_STRING as string)
				.replace('{DB_USERNAME}', DB_USERNAME as string)
				.replace('{DB_USERPWD}', DB_USERPWD as string)
				.replace('{DB_NAME}', DB_NAME as string)
		: null;

const connectionOptions: ConnectionOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
};

mongoose.connect(
	dbStr || DOCKERIZED_DB_URI || 'mongodb://localhost/tq',
	connectionOptions
);

mongoose.connection.on('open', () =>
	console.log('\x1b[32m%s\x1b[0m', 'Connected to database')
);

export const instance = mongoose.connection;
