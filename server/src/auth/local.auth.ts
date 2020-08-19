import passport from 'passport'
import User, { IUser } from 'models/User'
import { v4 as uuidv4 } from 'uuid'
import { getExpirationDate } from '../libs/user-expirations'
import { addUser } from 'libs/sockets'
import { Socket } from 'socket.io'
import { Request } from 'express'
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const { SESSION_SECRET } = process.env

// Authorization
passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: (req: Request) => (req.proc ? req.proc.proc : null),
			secretOrKey: SESSION_SECRET,
		},
		(payload: { [index: string]: string }, done: Function) => {
			User.findById({ _id: payload.sub }, (err, user) => {
				if (err) return done(err, false)
				if (user) return done(null, user)
				else return done(null, false)
			})
		}
	)
)

// Authentication
passport.use(
	'local',
	new LocalStrategy(
		{
			usernameField: 'tquser',
			passwordField: 'tqpwd',
		},
		async (tquser: string, tqpwd: string, done: Function) => {
			tquser = tquser.toLowerCase()
			try {
				const user = (await User.findOne({ username: tquser })) as IUser;
				if (await user.compareKey(user.key, tqpwd)) {
					done(null, user)
				} else {
					done(null, false)
				}
			} catch (error) {
				console.log(error)
				done(error)
			}
		}
	)
)

export const userExists = async (data: IUser, socket: Socket) => {
	let name = data.username.toLowerCase()
	const user = await User.findOne({ username: name })
	socket.emit('tq:exists', user)
}

export const userLogin = async (
	data: IUser,
	socket: Socket,
) => {
	const user = (await User.findById(data._id)) as IUser
	user.key = data.key
	if (!user.expired) {
        socket.emit('tq:login', user);
        addUser(user.username, socket.id);
	} else socket.emit('tq:login', { error: data._id, expired: true });
}

export const userRegister = async function <T extends { tquser: string; }>(
	data: T,
	socket: Socket
) {
	let key = uuidv4();
	const user = new User({
		enteredname: data.tquser,
		username: data.tquser.toLowerCase(),
		key: key,
		createdAt: new Date(),
		willExpireAt: getExpirationDate(),
		expired: false,
	})
	key = await user.hashKey(user.key)
	const savedUser = await user.save()
	socket.emit('save:LS', {
		_id: savedUser._id,
		key,
	})
}
