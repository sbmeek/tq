import React from 'react'
import './RegisterModal.css'

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
					<div styleName="inputs-registro">
						<label>Nombre tq</label>
						<input styleName="input"></input>
						<label>correo electronico </label>
						<input styleName="input"></input>
						<label>contraseña</label>
						<input styleName="input" type="password"></input>
						<label>confirmacion de contraseña</label>
						<input styleName="input" type="password"></input>
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
				</div>
			</div>
		</div>
	)
}
