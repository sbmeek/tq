import React, {
	useState,
	useEffect,
	useRef,
	useContext,
	FormEvent,
	FocusEvent,
	KeyboardEvent,
	ChangeEvent,
} from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import logo from 'assets/images/ltqrNEW.png';
import './Main-idx.css';
import { getAuthInfoAction } from 'global/ducks/authDucks';
import { InitContext } from 'global/context/InitContext';
import arrow from 'assets/images/icons/icons-main/icon-arrow.svg';
import Help from 'assets/images/icons/icons-main/icon-help.svg';
import info from 'assets/images/icons/icons-main/icon-info.svg';

type DataType = {
	_id: string;
	key: string;
};

export default function Main() {
	const [username, setUsername] = useState('');
	const [inputMode, setInputMode] = useState(false);
	const [showSubmitBtn, setShowSubmitBtn] = useState(false);
	const [isLogoLoaded, setIsLogoLoaded] = useState(false);
	const [isFieldLoaded, setIsFieldLoaded] = useState(false);
	const tqField = useRef<HTMLTextAreaElement>(null);
	const tqForm = useRef<HTMLFormElement>(null);
	const dispatch = useDispatch();

	const {
		state: {
			socket,
			lang: { Main: lang },
		},
	} = useContext(InitContext);

	useEffect(() => {
		(document as any).fonts.ready.then(function () {
			setIsFieldLoaded(true);
		});
	});

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const userVal = username;
		socket.emit('tq:exists', { username: userVal });
		socket.once('tq:exists', function (data: DataType) {
			if (data == null) {
				socket.emit('tq:register', { tquser: userVal });
				socket.on('save:LS', function (data: DataType) {
					localStorage.setItem(data._id, data.key);
					socket.emit('tq:login', data);
				});
			} else {
				data.key = localStorage.getItem(data._id) as string;
				socket.emit('tq:login', data);
			}
			socket.once('tq:login', async function <
				T extends {
					key: string;
					expired: boolean;
				}
			>(res: T) {
				if (res.expired) {
					return 0;
				}
				const keyVal = res.key != null ? res.key : 'err';
				let settings = {
					headers: { 'Content-Type': 'application/json' },
				};
				const resp = await axios.post(
					`/user/auth?tquser=${userVal}&tqpwd=${keyVal}`,
					settings
				);
				const data = await resp.data;
				if (data.authenticated) {
					dispatch(getAuthInfoAction());
				}
			});
		});
	};

	const formatVal = (val: string): string => {
		let l = val.length;
		return val!.slice(0, l - (l - 20)) as string;
	};

	const handleFieldChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const targetElement = e.target as HTMLTextAreaElement;
		let { value: val } = targetElement;
		val = val.match(/^[a-zA-Z0-9-\s]*$/) ? val : username;
		val = val.replace(
			/\s/g,
			val[0] !== ' ' &&
				val[targetElement.selectionStart] !== '-' &&
				val[targetElement.selectionStart - 2] !== '-'
				? '-'
				: ''
		);
		setUsername(formatVal(val));
		setShowSubmitBtn(val.length > 0);
	};

	const handleFieldFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
		setInputMode(!(e.type === 'blur' && username.length === 0));
		if (e.type === 'focus') tqField.current!.focus();
	};

	const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter') {
			tqForm.current!.dispatchEvent(
				new Event('submit', { cancelable: true })
			);
		}
	};

	return (
		<div styleName="main">
			<form
				ref={tqForm}
				styleName="form-container"
				onSubmit={handleFormSubmit}
			>
				<div styleName="logo-container">
					<img
						styleName={`_tq-logo ${isLogoLoaded ? 'loaded' : ''}`}
						src={logo}
						draggable="false"
						alt="logo"
						onLoad={() => setIsLogoLoaded(true)}
					/>
				</div>
				<div styleName="main-elements-container">
					<div
						styleName={`field-tq ${isFieldLoaded ? 'loaded' : ''}`}
					>
						<div
							styleName={`${inputMode ? 'input-mode' : ''}`}
							style={{
								boxShadow: `${
									showSubmitBtn
										? 'none'
										: '0px 3.2px 0px 2.2px var(--tq-blue-00)'
								}`,
							}}
							tabIndex={-1}
							data-show-submitbtn={showSubmitBtn}
						>
							<textarea
								value={username}
								id="usrTQ"
								data-name="tquser"
								styleName={`main-input ${
									inputMode ? 'input-mode' : ''
								}`}
								data-type={inputMode ? 'text' : 'button'}
								onChange={handleFieldChange}
								onFocus={handleFieldFocus}
								onBlur={handleFieldFocus}
								onKeyPress={handleKeyPress}
								ref={tqField}
								spellCheck="false"
								autoComplete="off"
								maxLength={20}
								placeholder={
									!inputMode ? lang['InputPlaceholder'] : ''
								}
							></textarea>
							{showSubmitBtn && (
								<button type="submit" styleName="main-btn">
									<img src={arrow} alt="arrow" />
								</button>
							)}
						</div>
						<div>
							<button type="button" styleName="_btn-tq">
								{lang['BtnInfo']}

								<img src={info} alt="arrow" />
							</button>
							<button type="button" styleName="_btn-tq">
								{lang['BtnHelp']}

								<img src={Help} alt="arrow" />
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
