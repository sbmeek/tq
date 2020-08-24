import React, { useState, useContext, MouseEvent, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './Inbox.css'
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

	const handleMsgClick = (_e: MouseEvent, _msgId: string) => {
		const actualMsg = messages.filter((m) => m._id === _msgId)[0]
		history.push({
			pathname: '/message',
			state: { actualMsg },
		})
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
					<h4>{lang['Title']}</h4>
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
							{messages.length}
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
										onClick={(e) => handleMsgClick(e, msg._id)}
										key={msg._id}
										styleName="inbox-msg"
									>
										<li className={msg._id}>"{msg.content}"</li>
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
								<div key={msg._id} styleName="inbox-msg">
									<li className={msg._id}>
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
