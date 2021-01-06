import React, {
	useState,
	useEffect,
	useRef,
	useContext,
	FormEvent
} from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import logo from 'assets/images/ltqrNEW.png';
import { getAuthInfoAction } from 'global/ducks/authDucks';
import { InitContext } from 'global/context/InitContext';
import Help from 'assets/images/icons/icons-main/icon-help.svg';
import info from 'assets/images/icons/icons-main/icon-info.svg';
import {
	MainContainer,
	FormContainer,
	LogoContainer,
	TQLogo,
	MainElementsContainer,
	FieldTQ,
	FirstFieldRow,
	SecondFieldRow,
	btnCustomStyle
} from './Join.style';
import Button from 'shared/button/Button';
import MainTextInput from 'components/main-text-input/MainTextInput';

type DataType = {
	_id: string;
	key: string;
};

export default function MainLogin() {
	const [username, setUsername] = useState('');
	const [inputMode, setInputMode] = useState(false);
	const [showSubmitBtn, setShowSubmitBtn] = useState(false);
	const [isLogoLoaded, setIsLogoLoaded] = useState(false);
	const [isFieldLoaded, setIsFieldLoaded] = useState(false);
	const tqForm = useRef<HTMLFormElement>(null);
	const dispatch = useDispatch();

	const {
		state: {
			socket,
			lang: { Main: lang }
		}
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
					headers: { 'Content-Type': 'application/json' }
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

	return (
		<MainContainer data-testid="main-container">
			<FormContainer ref={tqForm} onSubmit={handleFormSubmit}>
				<LogoContainer>
					<TQLogo
						isLogoLoaded={isLogoLoaded}
						src={logo}
						draggable="false"
						alt="logo"
						onLoad={() => setIsLogoLoaded(true)}
					/>
				</LogoContainer>
				<MainElementsContainer>
					<FieldTQ isFieldLoaded={isFieldLoaded}>
						<FirstFieldRow
							isInputMode={inputMode}
							shouldShowSubmitBtn={showSubmitBtn}
							tabIndex={-1}
							data-show-submitbtn={showSubmitBtn}
						>
							<MainTextInput
								username={username}
								setUsername={setUsername}
								inputMode={inputMode}
								setInputMode={setInputMode}
								showSubmitBtn={showSubmitBtn}
								setShowSubmitBtn={setShowSubmitBtn}
								tqForm={tqForm}
							/>
						</FirstFieldRow>
						<SecondFieldRow>
							<Button
								type="button"
								group="primary"
								hoverMode="color"
								customStyle={btnCustomStyle}
							>
								{lang['BtnInfo']}
								<img src={info} alt="arrow" />
							</Button>
							<Button
								type="button"
								group="primary"
								hoverMode="color"
								customStyle={btnCustomStyle}
							>
								{lang['BtnHelp']}
								<img src={Help} alt="arrow" />
							</Button>
						</SecondFieldRow>
					</FieldTQ>
				</MainElementsContainer>
			</FormContainer>
		</MainContainer>
	);
}
