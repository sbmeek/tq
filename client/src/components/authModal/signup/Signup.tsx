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

import {
	BtnsContainer,
	FieldsContainer,
	FormGroup,
	InfoBox,
	Input,
	Label,
	LinkTerms
} from './Signup.style';
import { AccountIcon, btnCustomStyle } from '../style';
import Button from 'shared/button/Button';

export default function Signup<
	T extends {
		setShowRegisteredComp: React.Dispatch<React.SetStateAction<boolean>>;
		setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
		setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
		hideModal: () => void;
		setIsViewChanged: React.Dispatch<React.SetStateAction<boolean>>;
	}
>({
	setShowLogin,
	setShowRegisteredComp,
	setIsViewChanged,
	hideModal,
	setIsModalOpened
}: T) {
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
		if (username.length > 20) errored = true;

		return errored;
	};

	const evalFieldsValue = useCallback(() => {
		for (let i in fields) {
			if (fields[i].value.length > 0) {
				setIsViewChanged(true);
				return;
			}
		}
		setIsViewChanged(false);
	}, [fields, setIsViewChanged]);

	useEffect(() => {
		evalFieldsValue();
	}, [evalFieldsValue, fields]);

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
		if (btnCreate.current) {
			btnCreate.current!.disabled = getNumberOfValidFields() < 4;
		}
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
		hideModal();
	};

	return (
		<>
			<form onSubmit={handleFormSubmit}>
				<FieldsContainer>
					<FormGroup>
						<Label>{lang['Username']}</Label>
						<Input
							type="text"
							onFocus={handleFieldFocus}
							onChange={handleFieldChange}
							id="username"
							isValid={fields['username'].valid}
							isLoading={fields['username'].loading}
							autoComplete="off"
							spellCheck="false"
							value={fields['username'].value}
							maxLength={20}
						/>
						{focusedFieldId === 'username' && !fields['username'].valid && (
							<FieldHelper fieldId="username" />
						)}
					</FormGroup>
					<FormGroup>
						<Label>{lang['Email']}</Label>
						<Input
							onChange={handleFieldChange}
							onFocus={handleFieldFocus}
							isValid={fields['email'].valid}
							isLoading={fields['email'].loading}
							type="email"
							id="email"
							autoComplete="off"
							spellCheck="false"
							value={fields['email'].value}
						/>
						{focusedFieldId === 'email' && !fields['email'].valid && (
							<FieldHelper fieldId="email" />
						)}
					</FormGroup>
					<FormGroup>
						<Label>{lang['Pwd']}</Label>
						<Input
							onChange={handleFieldChange}
							onFocus={handleFieldFocus}
							isValid={fields['pwd'].valid}
							isLoading={fields['pwd'].loading}
							type="password"
							id="pwd"
							value={fields['pwd'].value}
						/>
						{focusedFieldId === 'pwd' && !fields['pwd'].valid && (
							<FieldHelper fieldId="pwd" />
						)}
					</FormGroup>
					<FormGroup>
						<Label>{lang['ConfirmPwd']}</Label>
						<Input
							onChange={handleFieldChange}
							onFocus={handleFieldFocus}
							isValid={fields['cpwd'].valid}
							isLoading={fields['cpwd'].loading}
							type="password"
							id="cpwd"
							value={fields['cpwd'].value}
						/>
						{focusedFieldId === 'cpwd' && !fields['cpwd'].valid && (
							<FieldHelper fieldId="cpwd" />
						)}
					</FormGroup>
				</FieldsContainer>
				<BtnsContainer>
					<Button
						group="primary"
						hoverMode="translate"
						onMouseDown={handleBtnCancelClick}
						customStyle={btnCustomStyle}
					>
						<span>{lang['BtnCancel']}</span>
						<img src={xIcon} alt="cancel" />
					</Button>
					<Button
						group="secondary"
						hoverMode="translate"
						customStyle={btnCustomStyle}
						ref={btnCreate}
						disabled
					>
						<span>{lang['BtnCreateAccount']}</span>
						<AccountIcon src={account} alt="account" />
					</Button>
				</BtnsContainer>
				<LinkTerms onClick={() => setIsModalOpened(false)} to="/terms">
					{lang['TermsNConditions']}
				</LinkTerms>
			</form>
		</>
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

	return <InfoBox>{parse(msg)}</InfoBox>;
}
