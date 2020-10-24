import React, {
	useState,
	useContext,
	useEffect,
	useCallback,
	useRef
} from 'react';
import Axios from 'axios';
import parse from 'html-react-parser';
import account from 'assets/images/icons/share-icons/icon-account.svg';
import xIcon from 'assets/images/icons/share-icons/icon-x.svg';
import { InitContext } from 'global/context/InitContext';
import { Link } from 'react-router-dom';

import './Signup.css';

export default function Signup<
	T extends {
		setShowRegisteredComp: React.Dispatch<React.SetStateAction<boolean>>;
		setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
		setOpened: React.Dispatch<React.SetStateAction<boolean>>;
	}
>({ setShowLogin, setShowRegisteredComp, setOpened: setShowAuthModal }: T) {
	const [fields, setFields] = useState<{
		[key: string]: {
			value: string;
			valid: boolean | null;
			loading: boolean;
			timerID: NodeJS.Timeout | number | null;
		};
	}>({
		username: {
			value: '',
			valid: null,
			loading: false,
			timerID: null
		},
		email: {
			value: '',
			valid: null,
			loading: false,
			timerID: null
		},
		pwd: {
			value: '',
			valid: null,
			loading: false,
			timerID: null
		},
		cpwd: {
			value: '',
			valid: null,
			loading: false,
			timerID: null
		}
	});
	const [focusedFieldId, setFocusedFieldId] = useState('');
	const { Signup: lang } = useContext(InitContext).state.lang.AuthModal;
	const btnCreate = useRef<HTMLButtonElement>(null);

	const isEmail = (email: string) => {
		const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return !regex.test(String(email).toLowerCase());
	};

	const validatePwd = (pwd: string) => {
		//At least one upper AND one lower
		const regexPwd = /^(?=.*[A-Z])(?=.*[a-z])/;

		let errored = false;

		if (pwd !== undefined && pwd.length < 8) errored = true;
		if (!regexPwd.test(pwd)) errored = true;
		return errored;
	};

	const valdUsername = async (username: string) => {
		const usernameRegex = /^[a-zA-Z0-9]*$/;

		let errored = false;

		if (username.length < 3) errored = true;
		if (!usernameRegex.test(username)) errored = true;

		return errored;
	};

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const targetElement = e.target as HTMLInputElement;
		const val = targetElement.value;
		const id = targetElement.id;

		clearTimeout(fields[id].timerID as NodeJS.Timeout);
		if (val) {
			setFields((fields) => ({
				...fields,
				[id]: { ...fields[id], value: val, loading: true }
			}));
			fields[id].timerID = setTimeout(async () => {
				let isErrored = true;
				switch (id) {
					case 'username':
						isErrored = await valdUsername(val);
						break;
					case 'email':
						isErrored = isEmail(val);
						break;
					case 'pwd':
						isErrored = validatePwd(val);
						break;
					case 'cpwd':
						isErrored = fields!.pwd.value !== val;
						break;
				}
				targetElement.setAttribute('data-is-valid', !isErrored + '');
				setFields((fields) => ({
					...fields,
					[id]: {
						...fields[id],
						valid: !isErrored,
						loading: false
					}
				}));
			}, 800);
		} else {
			setFields((fields) => ({
				...fields,
				[id]: {
					...fields[focusedFieldId],
					valid: null,
					value: val,
					loading: false
				}
			}));
		}
	};

	useEffect(() => {
		btnCreate.current!.disabled = getNumberOfValidFields() < 4;
	});

	const getNumberOfValidFields = () => {
		let validFields = 0;
		for (let f in fields) {
			if (fields[f].valid) {
				validFields++;
			}
		}
		return validFields;
	};

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (getNumberOfValidFields() < 4) return;
		try {
			const values: { [key: string]: string } = {};
			for (let f in fields) {
				values[f] = fields[f].value;
			}
			const res = await Axios.post('/user/join', values);
			const { ok } = res.data;
			setShowRegisteredComp(ok as boolean);
			setShowLogin(ok as boolean);
		} catch (error) {
			console.error(error);
		}
	};

	const handleFieldFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setFocusedFieldId(e.target.id);
	};

	const handleBtnCancelClick = () => {
		setShowAuthModal(false);
	};

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
							styleName={`field ${
								fields['username'].loading
									? 'is-loading'
									: fields['username'].valid === null
									? ''
									: fields['username'].valid
									? 'is-valid'
									: 'is-invalid'
							}`}
							autoComplete="off"
							spellCheck="false"
							value={fields['username'].value}
						/>
						{focusedFieldId === 'username' && !fields['username'].valid && (
							<FieldHelper fieldId="username" />
						)}
					</div>
					<div styleName="field-container">
						<label>{lang['Email']}</label>
						<input
							onChange={handleFieldChange}
							onFocus={handleFieldFocus}
							styleName={`field ${
								fields['email'].loading
									? 'is-loading'
									: fields['email'].valid === null
									? ''
									: fields['email'].valid
									? 'is-valid'
									: 'is-invalid'
							}`}
							type="email"
							id="email"
							autoComplete="off"
							spellCheck="false"
							value={fields['email'].value}
						/>
						{focusedFieldId === 'email' && !fields['email'].valid && (
							<FieldHelper fieldId="email" />
						)}
					</div>
					<div styleName="field-container">
						<label>{lang['Pwd']}</label>
						<input
							onChange={handleFieldChange}
							onFocus={handleFieldFocus}
							styleName={`field ${
								fields['pwd'].loading
									? 'is-loading'
									: fields['pwd'].valid === null
									? ''
									: fields['pwd'].valid
									? 'is-valid'
									: 'is-invalid'
							}`}
							type="password"
							id="pwd"
							value={fields['pwd'].value}
						/>
						{focusedFieldId === 'pwd' && !fields['pwd'].valid && (
							<FieldHelper fieldId="pwd" />
						)}
					</div>
					<div styleName="field-container">
						<label>{lang['ConfirmPwd']}</label>
						<input
							onChange={handleFieldChange}
							onFocus={handleFieldFocus}
							styleName={`field ${
								fields['cpwd'].loading
									? 'is-loading'
									: fields['cpwd'].valid === null
									? ''
									: fields['cpwd'].valid
									? 'is-valid'
									: 'is-invalid'
							}`}
							type="password"
							id="cpwd"
							value={fields['cpwd'].value}
						/>
						{focusedFieldId === 'cpwd' && !fields['cpwd'].valid && (
							<FieldHelper fieldId="cpwd" />
						)}
					</div>
				</div>
				<div styleName="buttons">
					<button styleName="btn-cancel" onMouseDown={handleBtnCancelClick}>
						<span>{lang['BtnCancel']}</span>
						<img src={xIcon} alt="cancel" />
					</button>
					<button styleName="btn-create-account" ref={btnCreate} disabled>
						<span>{lang['BtnCreateAccount']}</span>
						<img src={account} alt="account" />
					</button>
				</div>
				<Link to="/terms" styleName="terms">
					{lang['TermsNConditions']}
				</Link>
			</form>
		</div>
	);
}

function FieldHelper<T extends { fieldId: string }>({ fieldId }: T) {
	const [msg, setMsg] = useState('');

	const { FieldHelper: lang } = useContext(
		InitContext
	).state.lang.AuthModal.Signup;

	const getFieldInfo = useCallback(() => {
		switch (fieldId) {
			case 'username':
				return lang['usernameHelpMsg'];
			case 'email':
				return lang['emailHelpMsg'];
			case 'pwd':
				return lang['pwdHelpMsg'];
			case 'cpwd':
				return lang['cpwdHelpMsg'];
			default:
				return '';
		}
	}, [fieldId, lang]);

	useEffect(() => {
		setMsg(getFieldInfo());
	}, [getFieldInfo]);

	return <div styleName="info-box">{parse(msg)}</div>;
}
