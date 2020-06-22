import React, { useState, useRef, useEffect, useContext } from 'react';
import './Bandeja-mobile.css';
// import Msg from './ReceivedMsg';
import { InitContext } from '../../global/context/InitContext';

export default function BandejaMobile({ messages }) {
    const [answer, setAnswer] = useState('');
    const [actualTab, setActualTab] = useState('msg');
    const [actualMsgId, setActualMsgId] = useState('');
    const { socket } = useContext(InitContext);
    const msgsTabContent = useRef(null);
    const ansTabContent = useRef(null);
    const templateQuestion = useRef(null);
    const templateAnswer = useRef(null);

    const handleTabClick = (e) => {
        const { id: trgtID } = e.target;
        setActualTab(trgtID === 'msg-tab' || trgtID === '' ? 'msg' : 'ans');
    }

    useEffect(() => {
        const selectedTabColor = 'rgba(0, 0, 0, 0.8)';
        const unselectedTabColor = 'rgb(78, 78, 78)';
        msgsTabContent.current.style.display = (actualTab === 'msg' ? 'flex' : 'none');
        ansTabContent.current.style.display = (actualTab === 'ans' ? 'flex' : 'none');
        document.querySelector('#msg-tab').style.background = (actualTab === 'msg' ? selectedTabColor : unselectedTabColor);
        document.querySelector('#ans-tab').style.background = (actualTab === 'ans' ? selectedTabColor : unselectedTabColor);
    }, [actualTab])

    const handleMsgClick = (e) => {
        const _msgId = e.target.classList[0];
        setActualMsgId(_msgId);
        const actualMsg = messages.filter(e => e._id === _msgId)[0];
        document.querySelector('#inb-cont').style.display = 'none';
        document.querySelector('#tmpt-cont').style.display = 'flex';
        templateAnswer.current.focus();
        templateQuestion.current.innerHTML = `"${actualMsg.content}"`;
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        let data = { answer, actualMsgId }
        socket.emit('msg:ans', data);
        socket.on('msg:ans', (data) => {
            if(data.success){
                //success
            }
        });
    }

    const handleInputChange = e => {
        setAnswer(e.target.value);
    }

    const handleBtnBackClick = () => {
        document.querySelector('#inb-cont').style.display = 'flex';
        document.querySelector('#tmpt-cont').style.display = 'none';
    }

    return (
        <div styleName="main-container">                
            <div styleName="inbox-container" id="inb-cont">
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
            <div styleName="template-container" id="tmpt-cont">
                <button 
                    styleName="template-btn-back"
                    onClick={handleBtnBackClick}
                >
                    <i className="material-icons">
                        arrow_back
                    </i>
                </button>
                <div 
                    className="d-text-select"
                    styleName="template-question"
                    ref={templateQuestion}
                >
                    "question"
                </div>
                <div 
                    styleName="template-answer"
                >
                    <form onSubmit={handleFormSubmit}>
                        <textarea
                            ref={templateAnswer}
                            type="text"
                            styleName="template-input-answer"
                            placeholder="Escribe tu respuesta..."
                            name="ans-msg" 
                            onChange={handleInputChange}
                            value={answer}
                        ></textarea>
                    </form>
                </div>
                {/* <button styleName="template-pencil"><i className="material-icons">edit</i></button> */}
            </div>
        </div>
    )
}
