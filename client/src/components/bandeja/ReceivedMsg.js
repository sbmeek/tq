import React, { useState, useEffect, useContext } from 'react'
import { InitContext } from '../../global/context/InitContext';

export const Msg = ({ msg, ans }) => {
    const [answer, setAnswer] = useState('');
    const [answeredWSuccess, setAnsweredWSuccess] = useState(false);
    const [msgId, setMsgId] = useState(0);
    const { socket } = useContext(InitContext);

    useEffect(() =>{
        setMsgId(msg._id);
        if(ans !== undefined){
            setAnswer(ans);
            setAnsweredWSuccess(true);
        }
    }, [msg._id, ans]);

    const handleFormSubmit = e => {
        e.preventDefault();
        let data = { answer, msgId }
        socket.emit('msg:ans', data);
        socket.on('msg:ans', (data) => {
            if(data.success){
                setAnsweredWSuccess(true);
            }
        });
    }

    const handleInputChange = e => {
        setAnswer(e.target.value);
    }

    return (
        <div 
            key={msg._id}
        >
            <li>"{msg.content}"</li>
            <form onSubmit={handleFormSubmit}>
                <div>
                {
                    answeredWSuccess && 
                    <span>Haz respondido este mensaje correctamente</span>
                }
                </div>
                {/* <input
                    name="ans-msg" 
                    onChange={handleInputChange}
                    value={answer}
                    style={{backgroundColor: 'white'}}
                /> */}
            </form>
            <br/>
        </div>
    )
}

export default Msg;