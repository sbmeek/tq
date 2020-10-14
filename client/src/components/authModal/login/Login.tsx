import React, { useState, useContext, useRef } from 'react';
import Axios from 'axios';
import account from 'assets/images/icons/share-icons/icon-account.svg';
import x from 'assets/images/icons/share-icons/icon-x.svg';
import { InitContext } from 'global/context/InitContext';
import { useDispatch } from 'react-redux';
import { getAuthInfoAction } from 'global/ducks/authDucks';

import styles from './Login.css';

export default function Login<
	T extends {
		errMsg: string;
		setErrMsg: React.Dispatch<React.SetStateAction<string>>;
		setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
		setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
	}
>({ errMsg, setErrMsg, setIsModalOpened, setShowMenu }: T) {
	const {
		AuthModal: { Login: lang }
	} = useContext(InitContext).state.lang;

	const [fields, setFields] = useState<{ [key: string]: string }>({
		usernameOrEmail: '',
		pwd: ''
	});

	const errMsgRef = useRef<HTMLDivElement>(null);

	const dispatch = useDispatch();

	const runErrMsgAnimation = () => {
		const errMsgRefCurr = errMsgRef.current!;
		errMsgRefCurr.classList.add(styles['toggleErrMsg']);
		errMsgRefCurr.onanimationend = () => {
			errMsgRef.current?.classList.remove(styles['toggleErrMsg']);
		};
	};

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const targetElement = e.target as HTMLInputElement;
		setFields({ ...fields, [targetElement.id]: targetElement.value });
	};

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			for (let f in fields) {
				if (fields[f].length === 0) {
					setErrMsg(lang['EmptyFieldsErrMsg']);
					runErrMsgAnimation();

					return;
				}
			}
			const res = await Axios.post(
				`/user/auth?tquser=${fields.usernameOrEmail}&tqpwd=${fields.pwd}`,
				fields
			);

			if (res.data.emailNotVerified) {
				setErrMsg(lang['EmailNotVerified']);
			} else if (!res.data.ok) {
				setErrMsg(lang['CredentialsErrMsg']);
			} else {
				setErrMsg('');
				setIsModalOpened(false);
				setShowMenu(false);
				dispatch(getAuthInfoAction());
			}
			runErrMsgAnimation();
		} catch (error) {
			console.error(error);
		}
	};

	const handleBtnCancelClick = () => {
		setIsModalOpened(false);
		setErrMsg('');
	};

	return (
		<div>
			<form onSubmit={handleFormSubmit}>
				<div styleName="inputs-registro">
					<div styleName="group">
						<label>{lang['UsernameOrEmail']}</label>
						<input
							type="text"
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

					<span ref={errMsgRef} styleName="err-msg">
						{errMsg}
					</span>
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
	);
}
