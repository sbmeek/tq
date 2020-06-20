import React, { useState, useRef, useEffect } from 'react';
import './Bandeja-mobile.css';
import Msg from './ReceivedMsg';

export default function BandejaMobile({ messages }) {
    const [actualTab, setActualTab] = useState('msg');
    const msgsTab = useRef(null);
    const ansTab = useRef(null);

    const handleTabClick = (e) => {
        const { id: trgtID } = e.target;
        setActualTab(trgtID === 'msg-tab' || trgtID === '' ? 'msg' : 'ans');
    }

    useEffect(() => {
        const selectedTabColor = 'rgba(0, 0, 0, 0.8)';
        const unselectedTabColor = 'rgb(78, 78, 78)';
        msgsTab.current.style.display = (actualTab === 'msg' ? 'flex' : 'none');
        ansTab.current.style.display = (actualTab === 'ans' ? 'flex' : 'none');
        document.querySelector('#msg-tab').style.background = (actualTab === 'msg' ? selectedTabColor : unselectedTabColor);
        document.querySelector('#ans-tab').style.background = (actualTab === 'ans' ? selectedTabColor : unselectedTabColor);
    }, [actualTab])

    return (
        <div styleName="main-container">                
            <div styleName="inbox-container">
                <h4>
                    <i className="material-icons">inbox</i> 
                    <span>Bandeja</span>
                </h4>
                <div>
                    <button 
                        id="msg-tab"
                        styleName="inbox-tab inbox-tab-msgs"
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
                <div ref={msgsTab}>
                    <ul styleName="inbox-msgs">
                        {
                            messages.map(msg => 
                                <Msg msg={msg} ans={msg.answer} key={msg._id} />
                            )
                        }
                    </ul>
                </div>
                <div ref={ansTab} styleName="template-container">
                    <div className="template-question"></div>
                    <div className="template-answer"></div>
                </div>
            </div>
        </div>
    )
}
