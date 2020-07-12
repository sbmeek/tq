import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Inbox from './Inbox';

export default function Bandeja(){
    const { user: { messages } } = useSelector(store => store.auth);
    const [msgsList, setMsgsList] = useState([]);
    const [answeredMsgs, setAnsweredMsgs] = useState([]); 

    useEffect(() => {
        let _ml = messages.filter(e => undefined === e.answer);
        setMsgsList(_ml);
        _ml = messages.filter(e => undefined !== e.answer)
        setAnsweredMsgs(_ml);
    }, [messages]);

    return (<Inbox messages={msgsList} answeredMsgs={answeredMsgs} />)
}
