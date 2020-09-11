import React, { useState, useContext } from 'react'
import Axios from 'axios'
import account from 'assets/images/icons/share-icons/icon-account.svg'
import x from 'assets/images/icons/share-icons/icon-x.svg'
import { InitContext } from 'global/context/InitContext'
import { useDispatch } from 'react-redux'
import { getAuthInfoAction } from 'global/ducks/authDucks'

import './Login.css'

export default function Login<
	T extends {
		errMsg: string
		setErrMsg: React.Dispatch<React.SetStateAction<string>>
		setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
		setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
	}
>({ errMsg, setErrMsg, setIsModalOpened, setShowMenu }: T) {
	const {
		AuthModal: { Login: lang },
	} = useContext(InitContext).state.lang

	const [fields, setFields] = useState({
		usernameOrEmail: '',
		pwd: '',
	})

	const dispatch = useDispatch()

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const targetElement = e.target as HTMLInputElement
		setFields({ ...fields, [targetElement.id]: targetElement.value })
	}

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const res = await Axios.post(
				`/user/auth?tquser=${fields.usernameOrEmail}&tqpwd=${fields.pwd}`,
				fields
			)

			if (res.data.emailNotVerified) {
				setErrMsg(lang['EmailNotVerified'])
			} else if (!res.data.ok) {
				setErrMsg(lang['CredentialsErrMsg'])
			} else {
				setErrMsg('')
				setIsModalOpened(false)
				setShowMenu(false)
				dispatch(getAuthInfoAction())
			}
		} catch (error) {
			console.error(error)
		}
	}

	const handleBtnCancelClick = () => {
		setIsModalOpened(false)
		setErrMsg('')
	}

	return (
		<div>
			<form onSubmit={handleFormSubmit}>
				<div styleName="inputs-registro">
					<div styleName="group">
						<label>{lang['UsernameOrEmail']}</label>
						<input
							type="text"
							autoFocus
							onChange={handleFieldChange}
							id="usernameOrEmail"
							styleName="input"
						/>
					</div>

					<div styleName="group">
						<label>{lang['Pwd']}</label>
						<input
							onChange={handleFieldChange}
							styleName="input input-pwd"
							type="password"
							id="pwd"
						/>
					</div>

					<span styleName="err-msg">{errMsg}</span>
				</div>
				<div styleName="btns-container">
					<button styleName="btn-cancel" onMouseDown={handleBtnCancelClick}>
						<span>{lang['BtnCancel']}</span>
						<img src={x} alt="cancel" />
					</button>

					<button styleName="btn-login">
						<span>{lang['BtnLogin']}</span>
						<img src={account} alt="account" />
					</button>
				</div>
			</form>
		</div>
	)
}
