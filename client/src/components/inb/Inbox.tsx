import React, {
	useState,
	useRef,
	useEffect,
	useContext,
	MouseEvent,
} from 'react'
import { useHistory } from 'react-router-dom'
import './Inbox.css'
import icon from '../../assets/images/icon.png'
import { InitContext } from '../../global/context/InitContext'
import SimpleBar from 'simplebar-react'

export default function Inbox<
	T extends {
		messages: ITQMessage[]
		answeredMsgs: ITQMessage[]
	}
>({ messages, answeredMsgs }: T) {
	const [actualTab, setActualTab] = useState('msg')
	const history = useHistory()
	const {
		state: {
			lang: { Inbox: lang },
		},
	} = useContext(InitContext)

	const handleTabClick = (e: MouseEvent<HTMLButtonElement>) => {
		const targetElement = e.target as HTMLButtonElement
		const { id } = targetElement
		setActualTab(id === 'msg-tab' || id === '' ? 'msg' : 'ans')
	}

	const handleMsgClick = (_e: MouseEvent<HTMLDivElement>, _msgId: string) => {
		const actualMsg = messages.filter((m) => m._id === _msgId)[0]
		history.push({
			pathname: '/message',
			state: { actualMsg },
		})
	}

	return (
		<div styleName="main-container">
			<div styleName="inbox-container" id="inb-cont">
				<h4>
					<div styleName="inbox-icon">
						<img
							className="responsive-image"
							src={icon}
							alt="icon"
							draggable="false"
						/>
					</div>
					<span>{lang['Title']}</span>
				</h4>
				<div>
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
						{messages.length < 1
							? `${lang['NoMessagesInfo']}`
							: `${lang['MsgTab']}`}
						<div styleName={`new-msgs-number ${messages.length < 1 && answeredMsgs.length < 1 ? 'no-msgs' : ''}`}>{messages.length}</div>
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
				</div>
				<div style={{ display: `${actualTab === 'ans' ? 'flex' : 'none'}` }}>
					<ul styleName="answered-msgs-container">
						{answeredMsgs.map((msg) => (
							<div key={msg._id} styleName="inbox-msg">
								<li className={msg._id}>
									"{msg.content}"<br />
									<i>ans: {msg.answer}</i>
								</li>
							</div>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}
