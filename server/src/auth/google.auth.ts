import { OAuth2Client, TokenPayload } from 'google-auth-library';
import User from 'models/User';
import { Request, Response } from 'express';
import { signToken } from 'routes/user.routes';
import { v4 as uuid } from 'uuid';
const { G_CLIENT_ID } = process.env;

export default async (req: Request, res: Response) => {
	const client = new OAuth2Client(G_CLIENT_ID);
	const { tokenId } = req.body;
	try {
		const response = await client.verifyIdToken({
			idToken: tokenId,
			audience: G_CLIENT_ID
		});
		const {
			name,
			email,
			email_verified
		} = response.getPayload() as TokenPayload;
		const username = name?.replace(' ', '-');
		if (email_verified) {
			let user = await User.findOne({ email });
			if (!user) {
				user = new User({
					email,
					enteredname: username,
					username: username!.toLowerCase(),
					isPermanentAccount: true,
					isEmailVerified: email_verified,
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
