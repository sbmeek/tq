import React, {
	useState,
	useContext,
	MouseEvent,
	useEffect,
	useRef,
} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styles from './Inbox.css'
import icon from 'assets/images/icon.png'
import { InitContext } from 'global/context/InitContext'
import parse from 'html-react-parser'
import SimpleBar from 'simplebar-react'
import ShareOrSaveModal from '../shareOrSaveModal/ShareOrSaveModal'

export default function Inbox<
	T extends {
		messages: ITQMessage[]
		answeredMsgs: ITQMessage[]
	}
>({ messages, answeredMsgs }: T) {
	const [actualTab, setActualTab] = useState('msg')
	const [showShareOrSaveModal, setShowShareOrSaveModal] = useState(false)
	const history = useHistory()
	const location = useLocation()
	const {
		state: {
			lang: { Inbox: lang },
		},
	} = useContext(InitContext)
	let openedMsgElement: HTMLDivElement

	useEffect(() => {
		let locationState = location.state as any
		if (locationState === undefined) {
			setShowShareOrSaveModal(false)
			return
		}
		setShowShareOrSaveModal(locationState['showShareOrSaveModal'])
	}, [location.state])

	const handleTabClick = (e: MouseEvent<HTMLButtonElement>) => {
		const targetElement = e.target as HTMLButtonElement
		const { id } = targetElement
		setActualTab(id === 'msg-tab' || id === '' ? 'msg' : 'ans')
	}

	const handleMsgClick = (e: MouseEvent<HTMLDivElement>) => {
		const targetElement = e.target as HTMLDivElement
		if (targetElement.classList.contains(styles['opened'])) {
			removeMsgOpenedStyle(targetElement)
		} else {
			if (openedMsgElement !== undefined) {
				removeMsgOpenedStyle(openedMsgElement)
			}
			targetElement.classList.add(styles['opened'])
		}
		openedMsgElement = targetElement
	}

	const handleAnswerMsgClick = (_e: MouseEvent, msgId: string) => {
		const actualMsg = messages.filter((m) => m._id === msgId)[0]
		history.push({
			pathname: '/message',
			state: { actualMsg },
		})
	}

	const removeMsgOpenedStyle = (targetElement: HTMLDivElement) => {
		targetElement.classList.remove(styles['opened'])
	}

	return (
		<div styleName="main-container">
			{showShareOrSaveModal && (
				<ShareOrSaveModal
					showShareOrSaveModal={showShareOrSaveModal}
					setShowShareOrSaveModal={setShowShareOrSaveModal}
				/>
			)}
			<div styleName="inbox-container" id="inb-cont">
				<div styleName="inbox-title">
					<div styleName="inbox-icon">
						<img
							className="responsive-image"
							src={icon}
							alt="icon"
							draggable="false"
						/>
					</div>
					<div styleName="title-inner-container">
						<h4>{lang['Title']}</h4>
						<div styleName="sombra-title"></div>
					</div>
				</div>
				<div styleName="inbox-tabs-container">
					<button
						id="msg-tab"
						styleName={`inbox-tab-msgs ${
							actualTab === 'msg' ? 'selected-tab' : ''
						} ${answeredMsgs.length < 1 ? 'not-answered-msgs' : ''} ${
							messages.length < 1 && answeredMsgs.length < 1 ? 'no-msgs' : ''
						} `}
						onClick={handleTabClick}
						autoFocus={true}
					>
						{messages.length < 1 && answeredMsgs.length < 1
							? `${lang['NoMessagesInfo']}`
							: `${lang['MsgTab']}`}
						<div
							styleName={`new-msgs-number ${
								messages.length < 1 && answeredMsgs.length < 1 ? 'no-msgs' : ''
							}`}
						>
							<span>{messages.length}</span>
						</div>
					</button>
					<button
						id="ans-tab"
						styleName={`ans-tab ${actualTab === 'ans' ? 'selected-tab' : ''}`}
						style={{
							display: answeredMsgs.length < 1 ? 'none' : 'flex',
						}}
						onClick={handleTabClick}
					>
						{lang['AnsTab']}
					</button>
				</div>
				<div style={{ display: `${actualTab === 'msg' ? 'flex' : 'none'}` }}>
					{messages.length > 0 ? (
						<ul styleName="inbox-msgs-container">
							<SimpleBar>
								{messages.map((msg) => (
									<div
										onClick={(e) => handleMsgClick(e)}
										key={msg._id}
										styleName="msg-container"
									>
										<div>
											<span styleName="sender-name">An&oacute;nimo</span>
											<button styleName="btn-report">
												<span role="img" aria-label="warn emoji">
													⚠️
												</span>
											</button>
										</div>
										<li styleName="msg-li">
											<span styleName="msg-content">"{msg.content}"</span>
											<button styleName="btn-delete">
												<span role="img" aria-label="delete emoji">
													🗑️
												</span>
											</button>
										</li>
										<button
											styleName="msg-btn-answer"
											onClick={(e) => handleAnswerMsgClick(e, msg._id)}
										>
											Answer
										</button>
									</div>
								))}
							</SimpleBar>
						</ul>
					) : (
						<div styleName="_info-no-msgs">{lang['NoMessagesInfo']}</div>
					)}
				</div>
				<div style={{ display: `${actualTab === 'ans' ? 'flex' : 'none'}` }}>
					<ul styleName="answered-msgs-container">
						<SimpleBar>
							{answeredMsgs.map((msg) => (
								<div
									key={msg._id}
									styleName="msg-container"
									style={{ padding: '0' }}
								>
									<li styleName="msg-li">
										"{msg.content}"<br />
										<i>ans: {parse(msg.answer as string)}</i>
									</li>
								</div>
							))}
						</SimpleBar>
					</ul>
				</div>
			</div>
		</div>
	)
}
