import { Router, Request, Response } from 'express';
import passport from 'passport';
import JWT from 'jsonwebtoken';
import User from 'models/User';
import { setExpirationDate } from 'utils/user-expirations';
import runValidators from 'utils/account-validations';
import { v4 as uuid } from 'uuid';
import { sendEmailConfirmationCode } from 'utils/account.utils';
import googleAuth from 'auth/google.auth';
import { AES as crypt, enc } from 'crypto-js';
import facebookAuth from 'auth/facebook.auth';
const { SESSION_SECRET, EPROC_KEY } = process.env;
const router = Router();

export const signToken = (iis: string, userId: string, isOAuth2?: boolean) => {
	return JWT.sign(
		{
			iis,
			sub: userId
		},
		SESSION_SECRET as string,
		{ expiresIn: isOAuth2 ? '9999d' : '1h' }
	);
};

router.post('/auth', (req: Request, res: Response, next) => {
	passport.authenticate('local', { session: false }, (err, user) => {
		if (err !== null && err.emailNotVerified) {
			res.json({
				authenticated: false,
				ok: false,
				emailNotVerified: true
			});
		} else if (!user) {
			res.json({ ok: false });
		} else {
			const { _id, enteredname } = user;
			const token = signToken('proc', _id);
			req.proc!.proc = token;
			res.json({ authenticated: true, enteredname, ok: true });
		}
	})(req, res, next);
});

router.post('/logout', (req: Request, res, next) => {
	passport.authenticate('jwt', { session: false }, (_err, user) => {
		if (!user) res.json({ authenticated: false, ok: false });
		else {
			req.proc.reset();
			res.json({ username: '', ok: true });
		}
	})(req, res, next);
});

router.get('/authenticated', (req, res, next) => {
	passport.authenticate('jwt', { session: false }, async (_err, user) => {
		if (!user) res.json({ authenticated: false, user: null });
		else {
			await setExpirationDate(user._id);
			const { username, enteredname, messages } = user;
			res.json({
				authenticated: true,
				username,
				enteredname,
				messages
			});
		}
	})(req, res, next);
});

router.post('/join', async (req, res) => {
	try {
		const { body: data } = req;
		const validator = await runValidators(data);
		if (validator.ok) {
			const user = new User({
				...data,
				enteredname: data.username,
				username: data.username.toLowerCase(),
				isPermanentAccount: true,
				isEmailVerified: false
			});
			user.keyOrPwd = await user.hashKeyOrPwd(data.pwd);
			user.save();
			sendEmailConfirmationCode(req, user);
			res.json({ ok: true });
		} else {
			res.json({ ...validator });
		}
	} catch (error) {
		console.error(error);
	}
});

router.post('/verifyEmailKey', async (req, res) => {
	const { encToken } = req.body;
	try {
		const bytes = crypt.decrypt(encToken, EPROC_KEY as string);
		const decToken = JSON.parse(bytes.toString(enc.Utf8));
		const tokenObj = JWT.verify(decToken.token, EPROC_KEY as string) as any;
		const user = await User.findOne({ email: tokenObj.em });

		if (user?.emailConfirmationCode === tokenObj.ky) {
			if (!user?.isEmailVerified) {
				await user?.updateOne({ $set: { isEmailVerified: true } });
				res.json({ wasEmailVerified: true, ok: true });
			} else {
				res.json({ ok: false });
			}
		} else {
			res.json({ wasEmailVerified: false, ok: false });
		}
	} catch (error) {
		res.json({
			wasEmailVerified: false,
			ok: false,
			stack: process.env.NODE_ENV === 'development' ? error.stack : '_'
		});
	}
});

router.post('/auth/google', googleAuth);
router.post('/auth/facebook', facebookAuth);

router.post('/tst_check', (req: Request, res: Response) => {
	const { enteredKey } = req.body;
	if (enteredKey === 'tq_check_tst_init') {
		if (req.tst.tst === undefined) {
			res.json({ isTester: false });
		} else {
			const tokenObj = JWT.verify(req.tst.tst, SESSION_SECRET as string) as any;
			if (tokenObj) {
				if (Date.now() / 1000 < tokenObj.exp) {
					res.json({ isTester: true });
				} else {
					req.tst.reset();
					res.json({ isTester: false });
				}
			}
		}
	} else if (enteredKey === '722d316') {
		req.tst.tst = signToken('tst', uuid());
		res.json({ isTester: true });
	} else {
		res.json({ isTester: false });
	}
});

router.get('/is_username_available', async (req: Request, res: Response) => {
	const { username } = req.query;
	const user = await User.findOne({ username: username as string });

	res.json({ isOk: user == null });
});

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
			key: 'a usted no le importa'
		}
	});
});

export default router;
