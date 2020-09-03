import React, { useState, useContext } from 'react'
import './Login.css'
import Axios from 'axios'
import { InitContext } from 'global/context/InitContext'
import account from 'assets/images/icons/share-icons/icon-account.svg'
import x from 'assets/images/icons/share-icons/icon-x.svg'
import { useDispatch } from 'react-redux'
import { getAuthInfoAction } from 'global/ducks/authDucks'

export default function Login<T extends {
    errMsg: string;
    setErrMsg: React.Dispatch<React.SetStateAction<string>>;
    setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}>({ errMsg, setErrMsg, setIsModalOpened, setShowMenu }: T) {
	const {
		AuthModal: { Login: lang },
	} = useContext(InitContext).state.lang

	const [fields, setFields] = useState({
		usernameOrEmail: '',
		pwd: '',
    })
    
    const dispatch = useDispatch();

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

            if(res.data.emailNotVerified){
                setErrMsg(lang['EmailNotVerified'])
            }
            else if(!res.data.ok){
                setErrMsg(lang['CredentialsErrMsg'])
            }
            else {
                setIsModalOpened(false)
                setShowMenu(false)
                dispatch(getAuthInfoAction())
            }
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
						id="usernameOrEmail"
						styleName="input"
					/>

					<label>{lang['Pwd']}</label>
					<input
						onChange={handleFieldChange}
						styleName="input input-pwd"
						type="password"
						id="pwd"
					/>

					<span styleName="err-msg">{errMsg}</span>
				</div>
				<div styleName="btns-container">
					<button styleName="btn-cancel">
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
