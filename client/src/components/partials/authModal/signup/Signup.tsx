import React, { useState, useContext } from 'react'
import './Signup.css'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { InitContext } from 'global/context/InitContext'

export default function Signup() {
    const [fields, setFields] = useState({})
    const { AuthModal: { Signup: lang } } = useContext(InitContext).state.lang

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const targetElement = e.target as HTMLInputElement
		setFields({ ...fields, [targetElement.id]: targetElement.value })
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
			<form onSubmit={handleFormSubmit}>
				<div styleName="inputs-registro">
                    <label>{lang['Username']}</label>
					<input
						type="text"
						autoFocus
						onChange={handleFieldChange}
						id="username"
						styleName="input"
					/>

                    <label>{lang['Email']}</label>
					<input
						onChange={handleFieldChange}
						styleName="input"
						type="email"
						id="email"
					/>

					<label>{lang['Pwd']}</label>
					<input
						onChange={handleFieldChange}
						styleName="input"
						type="password"
						id="pwd"
					/>

					<label>{lang['ConfirmPwd']}</label>
					<input
						onChange={handleFieldChange}
						styleName="input"
						type="password"
						id="cpwd"
					/>
				</div>
				<div styleName="buttons">
					<button styleName="cancel">
						<span>{lang['BtnCancel']}</span>
						<span>X</span>
					</button>

					<button styleName="crear">
						<span>{lang['BtnCreateAccount']}</span>
						<span>⇨</span>
					</button>
				</div>
                <Link to="/terms" styleName="terms">{lang['TermsNConditions']}</Link>
			</form>
		</div>
	)
}
