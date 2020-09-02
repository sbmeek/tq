import React, { useState, useContext, useEffect, useCallback } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { InitContext } from 'global/context/InitContext'
import parse from 'html-react-parser'
import account from 'assets/images/icons/share-icons/icon-account.svg'
import x from 'assets/images/icons/share-icons/icon-x.svg'
import { LoaderEye } from 'components/partials/loader/Loader'

import './Signup.css'
export default function Signup<
	T extends {
		setShowSignedupComp: React.Dispatch<React.SetStateAction<boolean>>
		setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
	}
>({ setShowLogin, setShowSignedupComp }: T) {
	const [fields, setFields] = useState<{ [key: string]: string }>({})
	const [focusedFieldId, setFocusedFieldId] = useState('')
	const [isFocusedFieldLoading, setIsFocusedFieldLoading] = useState(false)
	const [isFieldErrored, setIsFieldErrored] = useState(false)
	const [validFields, setValidFields] = useState<{ [key: string]: boolean }>({})

	const { Signup: lang } = useContext(InitContext).state.lang.AuthModal
	let timerID: NodeJS.Timeout

	const isEmail = (email: string) => {
		const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return !regex.test(String(email).toLowerCase())
	}

	const validatePwd = (pwd: string) => {
		//At least one upper AND one lower
		const regexPwd = /^(?=.*[A-Z])(?=.*[a-z])/

		let errored = false

		if (pwd !== undefined && pwd.length < 8) errored = true
		if (!regexPwd.test(pwd)) errored = true
		return errored
	}

	const valdUsername = async (username: string) => {
		const usernameRegex = /^[a-zA-Z0-9]*$/

		let errored = false

		if (username.length < 3) errored = true
		if (!usernameRegex.test(username)) errored = true

		return errored
	}

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const targetElement = e.target as HTMLInputElement
		const val = targetElement.value

		if (isFieldErrored || isFocusedFieldLoading) {
			clearTimeout(timerID)
		}

		if (targetElement.value) {
			setIsFocusedFieldLoading(true)
			timerID = setTimeout(async () => {
				let isErrored = true
				switch (targetElement.id) {
					case 'username':
						isErrored = await valdUsername(val)
						setIsFieldErrored(isErrored)
						break
					case 'email':
						isErrored = isEmail(val)
						setIsFieldErrored(isErrored)
						break
					case 'pwd':
						isErrored = validatePwd(val)
						setIsFieldErrored(isErrored)
						break
					case 'cpwd':
						isErrored = fields!.pwd !== targetElement.value
						setIsFieldErrored(isErrored)
						break
				}
				if (isErrored) {
					if (validFields[targetElement.id] !== undefined) {
						delete validFields[targetElement.id]
						setValidFields(validFields)
					}
					targetElement.setAttribute('data-is-valid', 'false')
				} else {
					setFocusedFieldId(document.activeElement!.id || '')
					setValidFields({ ...validFields, [targetElement.id]: true })
					targetElement.setAttribute('data-is-valid', 'true')
				}
				setIsFocusedFieldLoading(false)
			}, 800)
		}
		setFields({ ...fields, [targetElement.id]: targetElement.value })
	}

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const res = await Axios.post('/user/join', fields)
			const { ok } = res.data
			setShowSignedupComp(ok as boolean)
			setShowLogin(ok as boolean)
		} catch (error) {
			console.error(error)
		}
	}

	const handleFieldFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		if (isFieldErrored || isFocusedFieldLoading) {
			return
		}
		setFocusedFieldId(e.target.id)
	}

	return (
		<div>
			<form onSubmit={handleFormSubmit}>
				<div styleName="inputs-registro">
					<div styleName="field-container">
						<label>{lang['Username']}</label>
						<input
							type="text"
							onFocus={handleFieldFocus}
							onChange={handleFieldChange}
							id="username"
							styleName="input"
							autoComplete="off"
							spellCheck="false"
						/>
						{focusedFieldId === 'username' && isFocusedFieldLoading && (
							<div styleName="container-eye-loader">
								<LoaderEye size={'3%'} />
							</div>
						)}
						{focusedFieldId === 'username' && (
							<FieldHelper fieldId="username" isFieldErrored={isFieldErrored} />
						)}
					</div>
					<div styleName="field-container">
						<label>{lang['Email']}</label>
						<input
							onChange={handleFieldChange}
							onFocus={handleFieldFocus}
							styleName="input"
							type="email"
							id="email"
							autoComplete="off"
							spellCheck="false"
						/>
						{focusedFieldId === 'email' && isFocusedFieldLoading && (
							<div styleName="container-eye-loader">
								<LoaderEye size={'3%'} />
							</div>
						)}
						{focusedFieldId === 'email' && (
							<FieldHelper fieldId="email" isFieldErrored={isFieldErrored} />
						)}
					</div>
					<div styleName="field-container">
						<label>{lang['Pwd']}</label>
						<input
							onChange={handleFieldChange}
							onFocus={handleFieldFocus}
							styleName="input"
							type="password"
							id="pwd"
						/>
						{focusedFieldId === 'pwd' && isFocusedFieldLoading && (
							<div styleName="container-eye-loader">
								<LoaderEye size={'3%'} />
							</div>
						)}
						{focusedFieldId === 'pwd' && (
							<FieldHelper fieldId="pwd" isFieldErrored={isFieldErrored} />
						)}
					</div>
					<div styleName="field-container">
						<label>{lang['ConfirmPwd']}</label>
						<input
							onChange={handleFieldChange}
							onFocus={handleFieldFocus}
							styleName="input"
							type="password"
							id="cpwd"
						/>
						{focusedFieldId === 'cpwd' && isFocusedFieldLoading && (
							<div styleName="container-eye-loader">
								<LoaderEye size={'3%'} />
							</div>
						)}
						{focusedFieldId === 'cpwd' && isFieldErrored ? (
							<FieldHelper fieldId="cpwd" isFieldErrored={isFieldErrored} />
						) : null}
					</div>
				</div>
				<div styleName="buttons">
					<button styleName="cancel">
						<span>{lang['BtnCancel']}</span>
						<img src={x} alt="cancel" />
					</button>
					<button
						disabled={isFieldErrored || Object.keys(validFields).length !== 4}
						styleName="crear"
					>
						<span>{lang['BtnCreateAccount']}</span>
						<img src={account} alt="account" />
					</button>
				</div>
				<Link to="/terms" styleName="terms">
					{lang['TermsNConditions']}
				</Link>
			</form>
		</div>
	)
}

function FieldHelper<T extends { fieldId: string; isFieldErrored: boolean }>({
	fieldId,
	isFieldErrored,
}: T) {
	const [msg, setMsg] = useState('')
	const { FieldHelper: lang } = useContext(
		InitContext
	).state.lang.AuthModal.Signup
	const getFieldInfo = useCallback(() => {
		switch (fieldId) {
			case 'username':
				return lang['usernameHelpMsg']
			case 'email':
				return lang['emailHelpMsg']
			case 'pwd':
				return lang['pwdHelpMsg']
			case 'cpwd':
				return lang['cpwdHelpMsg']
			default:
				return ''
		}
	}, [fieldId, lang])

	useEffect(() => {
		setMsg(getFieldInfo())
	}, [getFieldInfo])

	return (
		<div styleName={`info-box ${isFieldErrored ? 'box-errored' : ''}`}>
			{parse(msg)}
		</div>
	)
}
