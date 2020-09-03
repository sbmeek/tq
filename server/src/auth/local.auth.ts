import passport from 'passport'
import User, { IUser } from 'models/User'
import { v4 as uuidv4 } from 'uuid'
import { getExpirationDate } from '../utils/user-expirations'
import { addUser } from 'utils/sockets'
import { Socket } from 'socket.io'
import { Request } from 'express'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy } from 'passport-jwt'
const { SESSION_SECRET } = process.env

// Authorization
passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: (req: Request) =>
				req.proc ? (req.proc.proc as string | null) : null,
			secretOrKey: SESSION_SECRET,
		},
		(payload: { [index: string]: string }, done: CallableFunction) => {
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
		async (tquser: string, tqpwd: string, done: CallableFunction) => {
            console.log(tquser, tqpwd)
			tquser = tquser.toLowerCase()
			try {
				const user = (await User.findOne({
					$or: [{ username: tquser }, { email: tquser }],
				})) as IUser
				if (user !== null) {
					if (
						await user.compareKeyOrPwd(
							user.keyOrPwd || user.key,
							tqpwd,
							user.isPermanentAccount
						)
					) {
						done(null, user)
					} else {
						done(null, false)
					}
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
	const name = data.username.toLowerCase()
	const user = await User.findOne({ username: name })
	socket.emit('tq:exists', user)
}

export const userLogin = async (
	data: IUser & { key: string },
	socket: Socket
) => {
	const user = (await User.findById(data._id)) as IUser
	user.key = user.keyOrPwd = data.key
	if (!user.expired) {
		socket.emit('tq:login', user)
		addUser(user.username, socket.id)
	} else socket.emit('tq:login', { error: data._id, expired: true })
}

export const userRegister = async function <T extends { tquser: string }>(
	data: T,
	socket: Socket
) {
	let key = uuidv4()
	const user = new User({
		enteredname: data.tquser,
		username: data.tquser.toLowerCase(),
		keyOrPwd: key,
		createdAt: new Date(),
		willExpireAt: getExpirationDate(),
		expired: false,
		isPermanentAccount: false,
	})
	key = await user.hashKeyOrPwd(user.keyOrPwd)
	const savedUser = await user.save()
	socket.emit('save:LS', {
		_id: savedUser._id,
		key,
	})
}
