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
        setAnswer(e.target.value);
    }

    return (
        <div styleName="template-container" id="tmpt-cont">
           <div > 
             <Link
                to="/messages"
                styleName="template-btn-back"
            >
                <i className="material-icons">
                    arrow_back
                </i>
            </Link>
            <Link
                to="/messages"
                styleName="template-btn-share"
            >
                <i className="material-icons">
                    share
                </i>
            </Link>
                
            <div
            className="template-options"
            styleName="template-options"
            >
                <h3 styleName="h3">hola</h3>
                
            </div>
            </div>
            <div
            className="template"
            styleName="template"
            >
                
            <div
                className="d-text-select"
                styleName="template-question"
                ref={templateQuestion}
            >
                ""
            </div>
            <div
                styleName="template-answer"
                ref={templateAnswer}
            >
                <form onSubmit={handleFormSubmit}>
                    <textarea
                        type="text"
                        styleName="template-input-answer"
                        placeholder="Escribe tu respuesta..."
                        name="ans-msg"
                        onChange={handleInputChange}
                        value={answer}
                    ></textarea>
                </form>
            </div>
            </div>
            
        </div>
    )
}
