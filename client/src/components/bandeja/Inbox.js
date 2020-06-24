import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Inbox.css';
import icon from '../../assets/images/icon.png'

export default function BandejaMobile({ messages, answeredMsgs }) {
    const [actualTab, setActualTab] = useState('msg');
    const msgsTabContent = useRef(null);
    const ansTabContent = useRef(null);
    const history = useHistory();
    
    const handleTabClick = (e) => {
        const { id: trgtID } = e.target;
        setActualTab(trgtID === 'msg-tab' || trgtID === '' ? 'msg' : 'ans');
    }

    useEffect(() => {
        const selectedTabColor = 'rgba(0, 0, 0, 0.8)';
        const unselectedTabColor = 'rgb(78, 78, 78)';
        msgsTabContent.current.style.display = (actualTab === 'msg' ? 'flex' : 'none');
        ansTabContent.current.style.display = (actualTab === 'ans' ? 'flex' : 'none');

        const ansTab = document.querySelector('#ans-tab');
        const msgTab = document.querySelector('#msg-tab');
        msgTab.style.background = (actualTab === 'msg' ? selectedTabColor : unselectedTabColor);
        ansTab.style.background = (actualTab === 'ans' ? selectedTabColor : unselectedTabColor);
        if(answeredMsgs.length < 1){
            ansTab.style.display = 'none';
            msgTab.style.width = '100%';
            msgTab.style.borderRadius = "12px";
        }
    }, [actualTab])

    const handleMsgClick = (e) => {
        const _msgId = e.target.classList[0];
        const actualMsg = messages.filter(e => e._id === _msgId)[0];
        history.push({
            pathname: '/message',
            state: { actualMsg }
        });
    }

    return (
        <div styleName="main-container">                
            <div styleName="inbox-container" id="inb-cont">
                <h4>
                <div styleName="icon-fondo">
                    <img
                        className="responsive-image"
                        styleName="icon"
                        src={icon}
                        alt="icon"
                        draggable="false"
                    /></div>
                    <span>Bandeja</span>
                </h4>
                <div>
                    <button 
                        id="msg-tab"
                        styleName=" inbox-tab-msgs"
                        onClick={handleTabClick}
                        autoFocus={true}
                    >
                            <span>Mensajes</span> 
        <div styleName="new-msgs-number">{messages.length}</div>
                    </button>
                    <button
                        id="ans-tab"
                        styleName="inbox-tab"
                        onClick={handleTabClick}
                    >
                        Respondidos
                    </button>
                </div>
                <div ref={msgsTabContent}>
                    <ul styleName="inbox-msgs">
                        {
                            messages.map(msg => 
                                <div 
                                    onClick={handleMsgClick}
                                    key={msg._id}
                                    className={msg._id}
                                >
                                    <li className={msg._id}>"{msg.content}"</li>
                                </div>
                            )
                        }
                    </ul>
                </div>
                <div ref={ansTabContent}>
                </div>
            </div>
        </div>
    )
}
