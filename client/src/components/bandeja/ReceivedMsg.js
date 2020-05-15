import React, { useState, useEffect, useContext } from 'react'
import { SocketContext } from '../../context/SocketContext';

export const Msg = ({ msg }) => {
    const [answer, setAnswer] = useState('');
    const [msgId, setMsgId] = useState(0);
    const { socket } = useContext(SocketContext);

    useEffect(() =>{
        setMsgId(msg._id);
    }, [msg._id]);

    const handleFormSubmit = e => {
        e.preventDefault();
        let data = { answer, msgId }
        socket.emit('msg:ans', data);
        socket.on('msg:ans', (data) => {
            console.log('answer sent');
        });
    }

    const handleInputChange = e => {
        setAnswer(e.target.value);
    }

    return (
        <div key={msg._id}>
            <li>{msg.content}</li>
            <form 
                onSubmit={handleFormSubmit}
            >
                <input 
                    name="ans-msg" 
                    onChange={handleInputChange}
                    value={answer}
                />
            </form>
        </div>
    )
}

export default Msg;