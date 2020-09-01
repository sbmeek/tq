import React from 'react'
import './RegisterModal.css'
import facebook from 'assets/images/share-icons/facebook.svg'
import google from 'assets/images/share-icons/google.svg'

export default function RegisterModal<
	T extends {
		opened: boolean
		setOpened: React.Dispatch<React.SetStateAction<boolean>>
	}
>({ opened, setOpened }: T) {
	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const targetElement = e.target as HTMLDivElement
		if (targetElement.id === 'overlay') setOpened(!opened)
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
						<div styleName="inputs-registro">
							<label>Nombre tq</label>
							<input styleName="input"></input>
							<label>correo electronico </label>
							<input styleName="input"  type="email"></input>
							<label>contraseña</label>
							<input styleName="input" type="password"></input>
							<label>confirmacion de contraseña</label>
							<input styleName="input" type="password"></input>
						</div>
						<div styleName="separador">
							<hr></hr>
							<div styleName="buttons-sign">
								<button styleName="google">
								<img src={google}  alt="sign" />
									<span><hr></hr>sign with google</span>
								
								</button>
								<button styleName="facebook"> 
								<img src={facebook}  alt="sgn" />
								<span><hr></hr>sign with facebook</span>
								</button>
								<div styleName="sombra-buttons"></div>
							</div>
						</div>
					</div>
					<div styleName="buttons">
						<button styleName="cancel">
							<span>Cancel</span>
							<span>X</span>
						</button>
						
						<button styleName="crear" >
							<span>Crear cuenta</span>
							<span>⇨</span>
						</button>
					</div>
					<a href="/terms">terms and conditions</a>
					</div>
					<span>¿ya tienes una cuenta? <a href="/terms">sign in</a></span>
				</div>
			</div>
		</div>
	)
}
