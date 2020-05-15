import React, { useContext } from 'react'
import Msg from './ReceivedMsg';
import { AuthContext } from '../../context/AuthContext';

export default function Bandeja(){
    const { user } = useContext(AuthContext);
    const { messages: msgs } = user;
    return (
        <div>
            <ul>
            {
                msgs.map(msg => 
                    <Msg msg={msg} key={msg._id} />
                )
            }
            </ul>
        </div>
    )
}
