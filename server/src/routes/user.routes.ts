import { Router, Request, Response } from 'express';
import passport from 'passport';
import JWT from 'jsonwebtoken';
import User from 'models/User'
import { setExpirationDate } from 'libs/user-expirations';
import runValidators from 'libs/account-validations'
const { SESSION_SECRET } = process.env;
const router = Router();

const signToken = (userId: string) =>
	JWT.sign(
		{
			iis: 'proc',
			sub: userId,
		},
		SESSION_SECRET as string,
		{ expiresIn: '1h' }
	)

router.post('/auth', (req: Request, res: Response, next) => {
	passport.authenticate('local', { session: false }, (err, user) => {
		if (err) console.error(err)
		if (!user) {
			res.json({ ok: false })
		} else {
			const { _id, enteredname } = user
            const token = signToken(_id)
			req.proc!.proc = token;
			res.status(200).json({ authenticated: true, enteredname })
		}
	})(req, res, next)
})

router.get('/logout', (req: Request, res, next) => {
	passport.authenticate('jwt', { session: false }, (_err, user) => {
		if (!user) res.json({ authenticated: false, success: false })
		else {
			req.proc.reset();
			res.json({ username: '', success: true })
		}
	})(req, res, next)
})

router.get('/authenticated', (req, res, next) => {
	passport.authenticate('jwt', { session: false }, async (_err, user) => {
		if (!user) res.json({ authenticated: false, user: null })
		else {
			await setExpirationDate(user._id)
			const { username, enteredname, messages } = user
			res.json({
				authenticated: true,
				username,
				enteredname,
				messages,
			})
		}
	})(req, res, next)
})

router.post('/join', async (req, res) => {
    try {
        const { body: data } = req;
        const validator = await runValidators(data)
        if(validator.ok){
            const user = new User({
                ...data,
                enteredname: data.username,
                username: data.username.toLowerCase(),
                isPermanentAccount: true 
            });
            user.keyOrPwd = await user.hashKeyOrPwd(data.pwd);
            console.log(user)
            user.save();
            res.json({ ok: true })
        }
        else{
            res.json({ ...validator })
        }
    } catch (error) {
        console.error(error)
    }
})

router.post('/signup-check', () => {

})

router.use((_req, res) => {
	res.status(404).json({
		error: 8,
		code: '0- No c q pasó -x24',
		msg: 'De segurito un 400 y algo...',
		info: 'Esto es un json :D',
		pd: 'en velda, en velda, no sé',
		secret: {
			true: true,
			false: true,
			key: 'a usted no le importa',
		},
	})
})

export default router;