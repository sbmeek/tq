import React, { useState, useContext } from 'react'
import './Login.css'
import Axios from 'axios'
import { InitContext } from 'global/context/InitContext'

export default function Login() {
    
    const { AuthModal: { Login: lang } } = useContext(InitContext).state.lang

    const [fields, setFields] = useState({})

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const targetElement = e.target as HTMLInputElement
		setFields({ ...fields, [targetElement.id]: targetElement.value })
	}

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const res = await Axios.post('/user/login', fields)
			console.log(res.data)
		} catch (error) {
			console.error(error)
		}
	}

    return (
        <div>
			<form onSubmit={handleFormSubmit}>
				<div styleName="inputs-registro">
                    <label>{lang['UsernameOrEmail']}</label>
					<input
						type="text"
						autoFocus
						onChange={handleFieldChange}
						id="username"
						styleName="input"
					/>

					<label>{lang['Pwd']}</label>
					<input
						onChange={handleFieldChange}
						styleName="input"
						type="password"
						id="pwd"
					/>

				</div>
				<div styleName="btns-container">
					<button styleName="btn-cancel">
						<span>{lang['BtnCancel']}</span>
						<span>X</span>
					</button>

					<button styleName="btn-login">
						<span>{lang['BtnLogin']}</span>
						<span>⇨</span>
					</button>
				</div>
			</form>
		</div>
    )
}
