import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';
import accountIcon from 'assets/images/icons/share-icons/icon-account.svg';
import xIcon from 'assets/images/icons/share-icons/icon-x.svg';
import { InitContext } from 'global/context/InitContext';
import { useDispatch } from 'react-redux';
import { getAuthInfoAction } from 'global/ducks/authDucks';

import {
	BtnsContainer,
	ErrMsg,
	FieldsContainer,
	Input,
	Label
} from './Login.style';
import Button from 'shared/button/Button';
import { AccountIcon, btnCustomStyle } from '../style';

export default function Login<
	T extends {
		errMsg: string;
		fromMenu?: boolean;
		setErrMsg: React.Dispatch<React.SetStateAction<string>>;
		setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
		setShowMenu?: React.Dispatch<React.SetStateAction<boolean>>;
		setIsViewChanged: React.Dispatch<React.SetStateAction<boolean>>;
		hideModal: () => void;
	}
>({
	errMsg,
	fromMenu,
	setErrMsg,
	setIsModalOpened,
	setShowMenu,
	setIsViewChanged,
	hideModal
}: T) {
	const {
		AuthModal: { Login: lang }
	} = useContext(InitContext).state.lang;

	const [fields, setFields] = useState<{ [key: string]: string }>({
		usernameOrEmail: '',
		pwd: ''
	});

	const [toggleErrMsg, setToggleErrMsg] = useState(false);
	const dispatch = useDispatch();

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const targetElement = e.target as HTMLInputElement;

		setFields({ ...fields, [targetElement.id]: targetElement.value });
	};

	useEffect(() => {
		setIsViewChanged(
			fields.usernameOrEmail.length > 0 || fields.pwd.length > 0
		);
	}, [fields, setIsViewChanged]);

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			for (let f in fields) {
				if (fields[f].length === 0) {
					setErrMsg(lang['EmptyFieldsErrMsg']);
					setToggleErrMsg(true);
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
				if (fromMenu) {
					setShowMenu!(false);
				}
				dispatch(getAuthInfoAction());
			}
			setToggleErrMsg(true);
		} catch (error) {
			console.error(error);
		}
	};

	const handleBtnCancelClick = () => {
		hideModal();
		setErrMsg('');
	};

	return (
		<>
			<form onSubmit={handleFormSubmit}>
				<FieldsContainer>
					<div>
						<Label>{lang['UsernameOrEmail']}</Label>
						<Input
							type="text"
							onChange={handleFieldChange}
							id="usernameOrEmail"
						/>
					</div>
					<div>
						<Label>{lang['Pwd']}</Label>
						<Input
							onChange={handleFieldChange}
							type="password"
							id="pwd"
							style={{ marginBottom: '0' }}
						/>
					</div>
					<ErrMsg
						onAnimationEnd={() => setToggleErrMsg(false)}
						toggleErrMsg={toggleErrMsg}
					>
						{errMsg}
					</ErrMsg>
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
					>
						<span>{lang['BtnLogin']}</span>
						<AccountIcon src={accountIcon} alt="account" />
					</Button>
				</BtnsContainer>
			</form>
		</>
	);
}
