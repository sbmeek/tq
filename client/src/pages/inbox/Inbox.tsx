import React, { useState, useContext, MouseEvent, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import icon from 'assets/images/icon.png';
import { InitContext } from 'global/context/InitContext';
import ShareOrSaveModal from 'components/shareOrSaveModal/ShareOrSaveModal';
import reportIcon from 'assets/images/icons/icons-inbox/icon-report.png';
import deleteIcon from 'assets/images/icons/icons-inbox/icon-delete.png';
import { useSelector, RootStateOrAny } from 'react-redux';
import {
	BtnAnswer,
	BtnDelete,
	BtnReport,
	BtnTab,
	Container,
	HeadContainer,
	HeadIcon,
	HeadIconContainer,
	HeadTextContainer,
	InnerContainer,
	MsgContainer,
	MsgItem,
	MsgsList,
	MsgsOffset,
	NewMsgsContainer,
	TabContent,
	TabsContainer
} from './Inbox.style';

export default function () {
	const {
		user: { messages }
	} = useSelector((store: RootStateOrAny) => store.auth);
	const [msgsList, setMsgsList] = useState([]);
	const [answeredMsgs, setAnsweredMsgs] = useState([]);

	useEffect(() => {
		let _msgList = messages.filter((e: ITQMessage) => undefined === e.answer);
		setMsgsList(_msgList);
		_msgList = messages.filter((e: ITQMessage) => undefined !== e.answer);
		setAnsweredMsgs(_msgList);
	}, [messages]);

	return (
		<Inbox
			messages={[...msgsList].reverse()}
			answeredMsgs={[...answeredMsgs].reverse()}
		/>
	);
}

const Inbox = <
	T extends {
		messages: ITQMessage[];
		answeredMsgs: ITQMessage[];
	}
>({
	messages,
	answeredMsgs
}: T) => {
	const [actualTab, setActualTab] = useState('msg');
	const [showShareOrSaveModal, setShowShareOrSaveModal] = useState(false);
	const history = useHistory();
	const location = useLocation();
	const {
		state: {
			lang: { Inbox: lang }
		}
	} = useContext(InitContext);
	let openedMsgElement: HTMLDivElement | undefined;

	useEffect(() => {
		let locationState = location.state as any;
		if (locationState === undefined) {
			setShowShareOrSaveModal(false);
			return;
		}
		setShowShareOrSaveModal(locationState['showShareOrSaveModal']);
	}, [location.state]);

	const handleTabClick = (e: MouseEvent<HTMLButtonElement>) => {
		const targetElement = e.target as HTMLButtonElement;
		const { id } = targetElement;
		setActualTab(id === 'msg-tab' || id === '' ? 'msg' : 'ans');
	};

	const handleMsgClick = (e: MouseEvent<HTMLDivElement>) => {
		const targetElement = e.target as HTMLDivElement;
		const isClickedElementOpened = targetElement.dataset.isopened === 'true';

		if (isClickedElementOpened) {
			targetElement.dataset.isopened = 'false';
		} else {
			if (openedMsgElement !== undefined) {
				openedMsgElement.dataset.isopened = 'false';
			}
			targetElement.dataset.isopened = 'true';
		}
		openedMsgElement = targetElement;
	};

	const handleAnswerMsgClick = (_e: MouseEvent, msgId: string) => {
		const actualMsg = messages.filter((m) => m._id === msgId)[0];
		history.push({
			pathname: '/message',
			state: { actualMsg }
		});
	};

	return (
		<Container>
			{showShareOrSaveModal && (
				<ShareOrSaveModal
					showShareOrSaveModal={showShareOrSaveModal}
					setShowShareOrSaveModal={setShowShareOrSaveModal}
				/>
			)}
			<InnerContainer id="inb-cont">
				<HeadContainer>
					<HeadIconContainer>
						<HeadIcon src={icon} alt="icon" draggable="false" />
					</HeadIconContainer>
					<HeadTextContainer>
						<h4>{lang['Title']}</h4>
					</HeadTextContainer>
				</HeadContainer>
				<TabsContainer>
					<BtnTab
						id="msg-tab"
						isSelected={actualTab === 'msg'}
						hasNotAnsweredMsgs={answeredMsgs.length < 1}
						hasNoMessages={messages.length < 1 && answeredMsgs.length < 1}
						onClick={handleTabClick}
						autoFocus={true}
					>
						{messages.length < 1 && answeredMsgs.length < 1
							? `${lang['NoMessagesInfo']}`
							: `${lang['MsgTab']}`}
						<NewMsgsContainer
							hasNoMessages={messages.length < 1 && answeredMsgs.length < 1}
						>
							<span>{messages.length}</span>
						</NewMsgsContainer>
					</BtnTab>
					<BtnTab
						id="ans-tab"
						isSelected={actualTab === 'ans'}
						style={{
							display: answeredMsgs.length < 1 ? 'none' : 'flex'
						}}
						isAnsTab
						onClick={handleTabClick}
					>
						{lang['AnsTab']}
					</BtnTab>
				</TabsContainer>
				<TabContent isTabSelected={actualTab === 'msg'}>
					{messages.length > 0 && (
						<MsgsList>
							<MsgsOffset>
								{messages.map((msg) => (
									<MsgContainer
										onClick={(e) => handleMsgClick(e)}
										key={msg._id}
										data-isopened={false}
									>
										<div>
											<span>An&oacute;nimo</span>
											<BtnReport>
												<img src={reportIcon} alt="report" />
											</BtnReport>
										</div>
										<MsgItem>
											<span>"{msg.content}"</span>
											<BtnDelete>
												<img src={deleteIcon} alt="delete" />
											</BtnDelete>
										</MsgItem>
										<BtnAnswer
											onClick={(e) => handleAnswerMsgClick(e, msg._id)}
										>
											<span>answer</span>
										</BtnAnswer>
									</MsgContainer>
								))}
							</MsgsOffset>
						</MsgsList>
					)}
				</TabContent>
				<TabContent isTabSelected={actualTab === 'ans'}>
					<MsgsList>
						<MsgsOffset>
							{answeredMsgs.map((msg) => (
								<MsgContainer key={msg._id} style={{ padding: '0' }}>
									<MsgItem>"{msg.content}"</MsgItem>
								</MsgContainer>
							))}
						</MsgsOffset>
					</MsgsList>
				</TabContent>
			</InnerContainer>
		</Container>
	);
};
