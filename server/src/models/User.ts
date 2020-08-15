import { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcrypt';

type uSchemaType = {
    compareKey: Function;
    hashKey: Function;
}

export interface IMsg { 
    sentAt?: Date;
    content?: string;
    readed?: boolean;
    answer?: string;
}

export interface IUser extends Document, uSchemaType{
    username: string;
    enteredname: string;
    key: string;
    createdAt: Date;
    willExpireAt: Date;
    expired: boolean;
    messages: IMsg[];
    _doc?: any;
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
	key: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: new Date(),
		required: true,
	},
	willExpireAt: {
		type: Date,
		required: true,
	},
	expired: {
		type: Boolean,
		required: true,
	},
	messages: [msgSchema],
})

uSchema.methods.compareKey = async (DBkey: string, LSkey: string) => {
	return await bcrypt.compare(DBkey, LSkey)
}

uSchema.methods.hashKey = async (key: string) => {
	try {
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(key, salt)
		return hash
	} catch (error) {
		console.error(error)
	}
}

export default model<IUser>('users', uSchema)
