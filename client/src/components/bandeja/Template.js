import React, { useState, useContext, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { InitContext } from '../../global/context/InitContext';
import './Template.css';

export default function Template() {
    const [answer, setAnswer] = useState('');
    const [actualMsg, setActualMsg] = useState({});
    const { socket } = useContext(InitContext);
    const templateQuestion = useRef(null);
    const templateAnswer = useRef(null);
    const ansContainer = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const { state: { actualMsg: msg } } = location
        setActualMsg(msg);
        templateAnswer.current.focus();
        templateQuestion.current.innerHTML = `"${actualMsg.content}"`;
    }, [location, actualMsg]);

    const handleFormSubmit = e => {
        e.preventDefault();
        let data = { answer };
        data._id = actualMsg._id;
        socket.emit('msg:ans', data);
        socket.on('msg:ans', (data) => {
            if (data.success) {
                //success
            }
        });
    }

    const handleInputChange = e => {
        const { value: ansVal } = e.target;
        const { current: ansTemplate } = ansContainer; 
        setAnswer(ansVal);
        ansTemplate.innerHTML = ansVal;
    }

    return (
        <div styleName="template-container" id="tmpt-cont">
            <div>
                <div styleName="template-head-btns">
                    <Link
                        to="/messages"
                        styleName="template-btn-back"
                    >
                        <i className="material-icons">keyboard_backspace</i>
                    </Link>
                    <button styleName="template-btn-share" onClick={() => alert('share')}>
                        <i className="material-icons">share</i>
                    </button>
                </div>
                <div styleName="template-answer">
                    <form 
                        styleName="template-answer-form-container" 
                        onSubmit={handleFormSubmit}
                    >
                        <div styleName="template-answer-btns-control-container">
                            <div styleName="template-answer-btns-format">
                                <button 
                                    type="button"
                                ><i className="material-icons">format_bold</i>
                                </button>
                                <button 
                                    type="button"
                                >
                                    <i className="material-icons">format_italic</i>
                                </button>
                                <button 
                                    type="button"
                                >
                                    <i className="material-icons">format_underlined</i>
                                </button>
                            </div>
                            <button type="button">
                                <i className="material-icons">emoji_emotions</i>
                            </button>
                        </div>
                        <div styleName="template-input-answer-container">
                            <input
                                type="text"
                                styleName="template-input-answer"
                                placeholder="Escribe tu respuesta..."
                                name="ans-msg"
                                onChange={handleInputChange}
                                value={answer}
                                autoComplete="off"
                            />
                        </div>
                        <div styleName="template-answer-options">
                            <button type="button">S</button>
                            <button type="button">P</button>
                            <button type="button">T</button>
                            <button type="button">M</button>
                            <button type="button">R</button>
                        </div>
                    </form>
                </div>
            </div>
            <div styleName="template-question-container">
                <div
                    className="d-text-select"
                    styleName="template-question"
                    ref={templateQuestion}
                >
                    ""
                </div>
                <div
                    styleName="template-answer-from-question"
                    ref={templateAnswer}
                >
                    <div ref={ansContainer}></div>
                </div>
            </div>
        </div>
    )
}
