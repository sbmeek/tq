import React, {
	useEffect,
	useState,
	useContext,
	ChangeEvent,
	FormEvent
} from 'react';
import MsgSent from 'components/msgSent/MsgSent';
import Error404 from '../error404/Error404';
import logo from 'assets/images/msg/profile-tq.png';
import { InitContext } from 'global/context/InitContext';
import cloud1 from 'assets/images/msg/cloud.png';
import cloud2 from 'assets/images/msg/cloud-2.png';
import arrow from 'assets/images/icons/icons-main/icon-arrow.svg';
import bold from 'assets/images/icons/templateEditor-icons/icons-message/icon-bold.svg';
import Italic from 'assets/images/icons/templateEditor-icons/icons-message/icon-italic.svg';
import strike from 'assets/images/icons/templateEditor-icons/icons-message/icon-strikethrough.svg';
import underlined from 'assets/images/icons/templateEditor-icons/icons-message/icon-underlined.svg';
import smile from 'assets/images/icons/templateEditor-icons/icons-message/iconfinder-Smile.svg';
import {
	Container,
	Curtain,
	MiniCurtain,
	CloudTop,
	Layer,
	EnLayer,
	Box,
	InputContainer,
	CloudBottom
} from './SendMsg.style';
import Loader from 'components/loader/Loader';

type DataType = {
	key?: string;
	expired?: boolean;
	sent?: boolean;
};

export default function <
	T extends { match: { params: P } },
	P extends { username: string }
>({ match: { params } }: T) {
	const {
		socket,
		lang: { MsgIdx: lang }
	} = useContext(InitContext).state;
	const [isLoading, setIsLoading] = useState(true);
	const [userExists, setUserExists] = useState(true);
	params.username = params.username.toLowerCase();

	useEffect(() => {
		if (socket !== undefined) {
			socket.emit('tq:exists', { username: params.username });
			socket.on('tq:exists', (data: DataType) => {
				if (data === null) {
					setUserExists(false);
				}
				if (null !== data && data.expired) {
					setUserExists(false);
				}
				setIsLoading(false);
			});
		}
	}, [socket, params.username]);

	return (
		<>
			{isLoading && <Loader />}
			{!userExists ? (
				<Error404 />
			) : (
				<Success username={params.username} socket={socket} lang={lang} />
			)}
		</>
	);
}

function Success<
	T extends {
		username: string;
		socket: SocketIOClientStatic['Socket'];
		lang: { [key: string]: string };
	}
>({ username, socket, lang }: T) {
	const [msg, setMsg] = useState('');
	const [sent, setSent] = useState(false);
	const [showSubmitBtn, setShowSubmitBtn] = useState(false);

	useEffect(() => {
		if (socket !== undefined) {
			socket.on('msg:send', (data: DataType) => {
				if (data.sent) {
					setSent(true);
					setMsg('');
				}
			});
		}
	}, [socket]);
	const formatVal = (val: string): string => {
		let l = val.length;
		return val!.slice(0, l - (l - 90)) as string;
	};
	const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const targetElement = e.target as HTMLTextAreaElement;
		const { value: val } = targetElement;
		setMsg(val);
		shoot(val);
		setMsg(formatVal(val));
	};

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = { username, msg };
		socket.emit('msg:send', data);
	};

	function shoot(val: string) {
		let isMsgNotEmpty = val.length !== 0;
		setShowSubmitBtn(isMsgNotEmpty);
	}

	return (
		<Container>
			{sent ? (
				<MsgSent />
			) : (
				<Curtain onSubmit={handleFormSubmit}>
					<MiniCurtain>
						<CloudTop>
							<img src={cloud2} alt="cloud2-top"></img>
							<img src={cloud1} alt="cloud-top"></img>
						</CloudTop>
						<Layer>
							<EnLayer>
								<div>
									<img src={logo} alt="logo" />
								</div>
								<div></div>
								<h3>{username}</h3>
								<h5>{lang['FirstRowText']}</h5>
								<h5>{lang['SecondRowText']}</h5>
								<Box>
									<div>
										<button title="Bold" type="button">
											<img src={bold} alt="editor" />
										</button>
										<button title="Italic" type="button">
											<img src={Italic} alt="editor" />
										</button>
										<button title="strike" type="button">
											<img src={strike} alt="editor" />
										</button>
										<button title="Underline" type="button">
											<img src={underlined} alt="editor" />
										</button>
										<div>
											<button type="button">
												<img src={smile} alt="emojis" />
											</button>
										</div>
									</div>
									<div>
										<img src={cloud2} alt="cloud2-bottom"></img>
										<img src={cloud1} alt="cloud-bottom"></img>
									</div>
									<InputContainer>
										<textarea
											data-type="text"
											name="msg"
											value={msg}
											id="msg"
											placeholder={lang['FieldPlaceholder']}
											onChange={handleInputChange}
											autoComplete="off"
											autoFocus
											spellCheck={false}
											maxLength={90}
										/>
										<button
											type="submit"
											className={`${showSubmitBtn ? 'active' : ''}`}
										>
											<img src={arrow} alt="arrow icon" />
										</button>
									</InputContainer>
									<CloudBottom>
										<img src={cloud1} alt="cloud1-bottom2"></img>
									</CloudBottom>
								</Box>
							</EnLayer>
						</Layer>
					</MiniCurtain>
				</Curtain>
			)}
		</Container>
	);
}
