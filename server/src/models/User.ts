import { Schema, Document, model } from 'mongoose'
import bcrypt from 'bcrypt'

type uSchemaType = {
	compareKeyOrPwd: CallableFunction
	hashKeyOrPwd: CallableFunction
}

export interface IMsg {
	sentAt?: Date
	content?: string
	readed?: boolean
	answer?: string
}

export interface IUser extends Document, uSchemaType {
	username: string
	enteredname: string
	isPermanentAccount: boolean
	keyOrPwd: string
	key?: string
	email?: string
	emailConfirmationCode?: string
	isEmailVerified?: boolean
	createdAt: Date
	willExpireAt?: Date
	expired?: boolean
	messages: IMsg[]
	_doc?: any
}

const msgSchema = new Schema({
	sentAt: { type: Date, default: new Date() },
	content: { type: String, required: true },
	readed: { type: Boolean, default: false },
	answer: { type: String, required: false },
})

const uSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	enteredname: {
		type: String,
		required: true,
		unique: true,
	},
	email: { type: String },
	emailConfirmationCode: { type: String },
	isEmailVerified: { type: Boolean },
	isPermanentAccount: { type: Boolean },
	keyOrPwd: { type: String },
	key: { type: String },
	createdAt: {
		type: Date,
		default: new Date(),
		required: true,
	},
	willExpireAt: { type: Date },
	expired: { type: Boolean },
	messages: [msgSchema],
})

uSchema.methods.compareKeyOrPwd = async (
	DBKeyOrPwd: string,
	KeyOrPwd: string,
	isPermanentAccount: boolean
) => {
	if (isPermanentAccount) return await bcrypt.compare(KeyOrPwd, DBKeyOrPwd)
	else return await bcrypt.compare(DBKeyOrPwd, KeyOrPwd)
}

uSchema.methods.hashKeyOrPwd = async (keyOrPwd: string) => {
	try {
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(keyOrPwd, salt)
		return hash
	} catch (error) {
		console.error(error)
	}
}

export default model<IUser>('users', uSchema)
