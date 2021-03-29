import mongoose, { ConnectionOptions } from 'mongoose';
import fs from 'fs';
require('dotenv').config();

const {
	DB_CONNECTION_STRING,
	DB_USERNAME,
	DB_USERPWD,
	DB_NAME,
	DOCKERIZED_DB_URI,
	NODE_ENV
} = process.env;

const isTestEnv = NODE_ENV === 'test';
const dbName = isTestEnv ? 'tqtest' : (DB_NAME as string);

const dbStr =
	DB_CONNECTION_STRING !== undefined
		? (DB_CONNECTION_STRING as string)
				.replace('{DB_USERNAME}', DB_USERNAME as string)
				.replace('{DB_USERPWD}', DB_USERPWD as string)
				.replace('{DB_NAME}', dbName)
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

mongoose.connection.on('open', async () => {
	console.log('\x1b[32m%s\x1b[0m', `Connected to database "${dbName}"`);

	if (isTestEnv) {
		await mongoose.connection.db.dropDatabase();
		fs.readFile('./src/db-test-data.json', (err, data) => {
			if (err) throw err;

			const dbData: { [key: string]: any[] } = JSON.parse(data.toString());
			Object.keys(dbData).forEach(async (d) => {
				let coll = mongoose.connection.collections[d];
				if (!coll) {
					coll = (await mongoose.connection.createCollection(
						d
					)) as mongoose.Collection;
				}
				await coll.insertMany(dbData[d]);
			});
		});

		console.log('Test data has been restored');
	}
});

export const instance = mongoose.connection;
