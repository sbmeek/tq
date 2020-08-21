import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import Inbox from './mainInbox/Inbox'
import { InitContext } from '../../global/context/InitContext'
import { useContext } from 'react'
import { setUserMessagesAction } from '../../global/ducks/authDucks'

export default function InbIdx() {
	const { user: { messages } } = useSelector((store: RootStateOrAny) => store.auth)
	const dispatch = useDispatch()
	const {
		state: { socket },
	} = useContext(InitContext)
	const [msgsList, setMsgsList] = useState([])
	const [answeredMsgs, setAnsweredMsgs] = useState([])

	useEffect(() => {
		socket.on('msg:new', (data: ITQMessage[]) => {
			dispatch(setUserMessagesAction(data))
		})
	}, [socket, dispatch])

	useEffect(() => {
		let _ml = messages.filter((e: ITQMessage) => undefined === e.answer)
		setMsgsList(_ml)
		_ml = messages.filter((e: ITQMessage) => undefined !== e.answer)
		setAnsweredMsgs(_ml)
	}, [messages])

	return <Inbox messages={msgsList} answeredMsgs={answeredMsgs} />
}
