import User from 'models/User';
import { Request, Response } from 'express';
import { signToken } from 'routes/user.routes';
import { v4 as uuid } from 'uuid';
import fetch from 'node-fetch';

export default async (req: Request, res: Response) => {
	try {
		const { userId, accessToken } = req.body;
		const url = `https://graph.facebook.com/${userId}/?fields=name,email&access_token=${accessToken}`;
		const response = await fetch(url);
		const data = await response.json();
		const { name, id, email } = data;
		const username = name?.replace(' ', '-');
		if (email || id) {
			let user = await User.findOne({ email: email || id });
			if (!user) {
				user = new User({
					email: email || id,
					enteredname: username,
					username: username!.toLowerCase(),
					isPermanentAccount: true,
					isEmailVerified: true,
					authMethod: 'google'
				});
				user.keyOrPwd = await user.hashKeyOrPwd(uuid());
				await user.save();
			}
			const { enteredname } = user;
			const token = signToken('proc', user._id, true);
			req.proc!.proc = token;
			res.json({ authenticated: true, enteredname, ok: true });
		} else {
			res.json({
				authenticated: false,
				ok: false,
				emailNotVerified: true
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			error: process.env.NODE_ENV === 'development' ? error.stack : 'Bv'
		});
	}
};
