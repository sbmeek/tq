import { Router, Request, Response } from 'express'
import passport from 'passport'
import JWT from 'jsonwebtoken'
import User from 'models/User'
import { setExpirationDate } from 'libs/user-expirations'
import runValidators from 'libs/account-validations'
import { v4 as uuid } from 'uuid'
const { SESSION_SECRET } = process.env
const router = Router()

const signToken = (iis: string, userId: string) => {
	return JWT.sign(
		{
			iis,
			sub: userId,
		},
		SESSION_SECRET as string,
		{ expiresIn: '1h' }
    )
}

router.post('/auth', (req: Request, res: Response, next) => {
	passport.authenticate('local', { session: false }, (err, user) => {
		if (err) console.error(err)
		if (!user) {
			res.json({ ok: false })
		} else {
			const { _id, enteredname } = user
			const token = signToken('proc', _id)
			req.proc!.proc = token
			res.status(200).json({ authenticated: true, enteredname, ok: true })
		}
	})(req, res, next)
})

router.post('/logout', (req: Request, res, next) => {
	passport.authenticate('jwt', { session: false }, (_err, user) => {
		if (!user) res.json({ authenticated: false, ok: false })
		else {
			req.proc.reset()
			res.json({ username: '', ok: true })
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
		const { body: data } = req
		const validator = await runValidators(data)
		if (validator.ok) {
			const user = new User({
				...data,
				enteredname: data.username,
				username: data.username.toLowerCase(),
				isPermanentAccount: true,
			})
			user.keyOrPwd = await user.hashKeyOrPwd(data.pwd)
			user.save()
			res.json({ ok: true })
		} else {
			res.json({ ...validator })
		}
	} catch (error) {
		console.error(error)
	}
})

router.post('/tst_check', (req: Request, res: Response) => {
    const { enteredKey } = req.body
    if(enteredKey === 'tq_check_tst_init'){
        if(req.tst.tst === undefined){
            res.json({ isTester: false })
        }
        else {
            const tokenObj = (JWT.verify(req.tst.tst, SESSION_SECRET as string) as any);
            if(tokenObj){
                if(Date.now() / 1000 < tokenObj.exp){
                    res.json({ isTester: true })
                }else{
                    req.tst.reset();
                    res.json({ isTester: false })
                }
            }
        }
    }
	else if (enteredKey === '722d316') {
        req.tst.tst = signToken('tst', uuid())
		res.json({ isTester: true })
    }
    else {
		res.json({ isTester: false })
    }
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

export default router
