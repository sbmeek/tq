import React, { useState } from 'react'
import './RegisterModal.css'
import facebookLogo from 'assets/images/share-icons/facebook.svg'
import googleLogo from 'assets/images/share-icons/google.svg'
import Axios from 'axios'

export default function RegisterModal<
	T extends {
		opened: boolean
		setOpened: React.Dispatch<React.SetStateAction<boolean>>
	}
>({ opened, setOpened }: T) {
	const [fields, setFields] = useState({})

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const targetElement = e.target as HTMLInputElement
		setFields({ ...fields, [targetElement.id]: targetElement.value })
	}

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const targetElement = e.target as HTMLDivElement
		if (targetElement.id === 'overlay') setOpened(!opened)
	}

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const res = await Axios.post('/user/join', fields)
			console.log(res.data)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div>
			<div
				onClick={handleOverlayClick}
				styleName={`overlay ${opened ? 'active' : ''}`}
				id="overlay"
			>
				<div styleName="container">
					<h1>Registrar nombre TQ</h1>
					<div styleName="inputs-and-buttons">
						<div styleName="inputs-and-sign-container">
							<form onSubmit={handleFormSubmit}>
								<div styleName="inputs-registro">
									<label>Nombre tq</label>
									<input
										type="text"
										autoFocus
										onChange={handleFieldChange}
										id="username"
										styleName="input"
									/>

									<label>correo electronico </label>
									<input
										onChange={handleFieldChange}
										styleName="input"
										type="email"
										id="email"
									/>

									<label>contraseña</label>
									<input
										onChange={handleFieldChange}
										styleName="input"
										type="password"
										id="pwd"
									/>

									<label>confirmacion de contraseña</label>
									<input
										onChange={handleFieldChange}
										styleName="input"
										type="password"
										id="cpwd"
									/>
								</div>
								<div styleName="buttons">
									<button styleName="cancel">
										<span>Cancel</span>
										<span>X</span>
									</button>

									<button styleName="crear">
										<span>Crear cuenta</span>
										<span>⇨</span>
									</button>
								</div>
								<a href="/terms">terms and conditions</a>
							</form>
							<div styleName="separador">
								<hr></hr>
								<div styleName="buttons-sign">
									<button styleName="google">
										<img src={googleLogo} alt="google logo" />
										<span>
											<hr></hr>sign with google
										</span>
									</button>
									<button styleName="facebook">
										<img src={facebookLogo} alt="facebook logo" />
										<span>
											<hr></hr>sign with facebook
										</span>
									</button>
									<div styleName="sombra-buttons"></div>
								</div>
							</div>
						</div>
					</div>
					<span>
						¿ya tienes una cuenta? <a href="/terms">sign in</a>
					</span>
				</div>
			</div>
		</div>
	)
}
