import mongoose, { ConnectionOptions } from 'mongoose'
require('dotenv').config();

const connectionOptions: ConnectionOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
}

mongoose.connect(process.env.DB_CONNECTION_STRING as string, connectionOptions);

mongoose.connection.on('open', () =>
	console.log('\x1b[32m%s\x1b[0m', 'Connected to database')
)

export const instance = mongoose.connection
