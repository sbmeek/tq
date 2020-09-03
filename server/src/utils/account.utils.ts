import nodemailer, { SendMailOptions } from 'nodemailer'
import { Request } from 'express'
import JWT from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'
import { IUser } from 'models/User'
import { AES as crypt } from 'crypto-js'

const {
	G_MAIL_ACCOUNT,
	G_CLIENT_ID,
	G_CLIENT_SECRET,
	G_REFRESH_TOKEN,
	G_ACCESS_TOKEN,
	EPROC_KEY,
} = process.env

export const sendEmailConfirmationCode = async (
	{ headers: { origin } }: Request,
	user: IUser
) => {
	const key = uuid()

	JWT.sign(
		{
			ky: key,
			em: user.email,
		},
		EPROC_KEY as string,
		{ expiresIn: '1d' },
		async (err, token) => {
			if (err) throw err

			await user.updateOne({ $set: { emailConfirmationCode: key } })

            const encToken = crypt.encrypt(JSON.stringify({ token }), EPROC_KEY as string).toString();

            const href = process.env.NODE_ENV === 'production' ? origin as string : 'http://localhost:3000';
            
			const mailOptions: SendMailOptions = {
				to: user.email,
				from: G_MAIL_ACCOUNT,
				subject: 'Confirmación de cuenta: TQ',
				html: `
            <div style="width: 352px;">
                <div>
                    <h3>Gracias por registrarte</h3>
                    <h4>Ahora confirme su cuenta</h4>
                    <p>Haz click en "Continuar" para confirmar tu cuenta, bienvenido a nuestra plataforma.</p>
                    <div style="text-align: right;">
                        <a href="${href}/account/verify?t=${encodeURIComponent(encToken)}">Continuar</a>
                    </div>
                </div>
            </div>
            `,
			}

			const transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					type: 'OAuth2',
					user: G_MAIL_ACCOUNT,
					clientId: G_CLIENT_ID,
					clientSecret: G_CLIENT_SECRET,
					refreshToken: G_REFRESH_TOKEN,
					accessToken: G_ACCESS_TOKEN,
				},
			})

			const res = await transporter.sendMail(mailOptions)
			return res
		}
	)
}
