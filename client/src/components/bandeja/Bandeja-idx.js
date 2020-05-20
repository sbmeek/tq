import React from 'react'
import Msg from './ReceivedMsg';
import { useSelector } from 'react-redux';

export default function Bandeja(){
    const { user: { messages } } = useSelector(store => store.auth);

    return (
        <div>
            <ul>
            {
                messages.map(msg => 
                    <Msg msg={msg} ans={msg.answer} key={msg._id} />
                )
            }
            </ul>
        </div>
    )
}
