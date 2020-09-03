import express from 'express'
import morgan from 'morgan'
import favicon from 'serve-favicon'
import path from 'path'
import cors from 'cors'
import userRoutes from './routes/user.routes'
import sessions from 'client-sessions'
import helmet from 'helmet'
require('dotenv').config()

const { SESSION_SECRET } = process.env
const app = express()
require('./database') // Establishes db connection
import(
	path.join(__dirname, 'utils', 'user-expirations')
).then((userExpirations) => userExpirations.checkExpirations()) // Defines and starts agenda (job: check user expirations at 00:00 daily)

// Settings
app.set('port', process.env.PORT || 2017)
app.set('favicon', path.join(__dirname, '../favicon.ico'))
app.set('json spaces', 2)

// Middlewares
app.use(
	sessions({
		cookieName: 'proc',
		secret: SESSION_SECRET as string,
		duration: 24 * 60 * 60 * 1000,
		cookie: {
			httpOnly: true,
			secure: false,
		},
	})
)
app.use(
	sessions({
		cookieName: 'tst',
		secret: SESSION_SECRET as string,
		duration: 24 * 60 * 60 * 1000,
		cookie: {
			httpOnly: true,
			secure: false,
		},
	})
)
app.use(helmet())
app.use(favicon(app.get('favicon')))
app.use(cors({ origin: 'http://127.0.0.1:3000' }))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/user', userRoutes)

// Static files
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.resolve(path.join('..', 'client', 'build'))))
}

export const server = app.listen(app.get('port'), () =>
	console.log('\x1b[32m%s\x1b[0m', `Server running :${app.get('port')}`)
)

require('./utils/sockets')
