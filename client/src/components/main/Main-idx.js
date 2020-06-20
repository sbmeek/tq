import React, { useState, useEffect, useRef, useContext } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Alert from '../partials/Alert';
import logo from '../../assets/images/ltqrNEW.png';
import './Main-idx.css';

import { getAuthInfoAction } from '../../global/ducks/authDucks';
import { InitContext, SET_IS_RENDERED } from '../../global/context/InitContext';

const A = new Alert();

function Main() {
    const [fields, setFields] = useState({});
    const inputNomTQ = useRef(null);
    const btnTQ = useRef(null);
    const dispatchAuth = useDispatch();
    const { state: { socket }, dispatch: dispatchInit } = useContext(InitContext);

    useEffect(() => {
        window.addEventListener("load", () => resizeMainElements(inputNomTQ, btnTQ))
        window.addEventListener("resize", () => resizeMainElements(inputNomTQ, btnTQ));
    }, []);

    useEffect(() => {
        let font = `1rem 'Material Icons'`;
        document.fonts.ready.then(function() {
            if(document.fonts.check(font)) {
                inputNomTQ.current.style.fontFamily = `'Nunito', sans-serif`;
                setTimeout(() => {
                    dispatchInit({
                        type: SET_IS_RENDERED,
                        payload: { isRendered: true }
                    });
                }, 500);
                resizeMainElements(inputNomTQ, btnTQ)
            }
        });
    }, [dispatchInit])

    const setElementsRed = () => {
        let somethingsWrongColor = 'border-color:#d93025!important;box-shadow: -0.2rem 0.2rem 0.2rem 0rem rgba(249, 0, 0, 0.25) !important;'
        btnTQ.current.style.cssText += somethingsWrongColor;
        inputNomTQ.current.style.cssText += somethingsWrongColor;
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const { tquser: userVal } = fields;
        socket.emit('tq:exists', { username: userVal })
        socket.once('tq:exists', (data) => {
            if (data == null) {
                socket.emit('tq:register', { tquser: userVal });
                socket.on('save:LS', (data) => {
                    localStorage.setItem(data._id, data.key);
                    socket.emit('tq:login', data);
                });
            } else {
                data.key = localStorage.getItem(data._id);
                socket.emit('tq:login', data)
            }
            socket.once('tq:login', async (res) => {
                if (res.expired) {
                    A.trigger('Este usuario ha expirado.', {
                        btnHTML: '<button id="btn-ok" class="btn red darken-4 waves-light waves-effect" onclick="A.ok()">Ok</button>'
                    });
                    setElementsRed();
                    return 0;
                }
                const keyVal = (res.key != null ? res.key : 'err');
                let settings = {
                    headers: { 'Content-Type': 'application/json' }
                }
                const resp = await axios.post(`/user/auth?tquser=${userVal}&tqpwd=${keyVal}`, settings);
                const data = await resp.data;
                if (data.authenticated){
                    dispatchAuth(getAuthInfoAction());
                }
                else {
                    A.trigger('Este usuario no está disponible.', {
                        btnHTML: '<button id="btn-ok" class="btn red darken-4 waves-light waves-effect" onclick="A.ok()">Ok</button>'
                    });
                    setElementsRed();
                }
            });
        })
    }

    const handleFieldFocus = () => {
        const { current: input } = inputNomTQ;
        const { current: btn } = btnTQ;
        if(input.style.borderColor !== 'rgb(217, 48, 37)' && 
        input.style.borderColor !== 'rgb(128, 189, 255)')
            btn.style.cssText += `
            color: #ccc;
            background-color: #fff !important;
            border-color: #80bdff !important;
            outline: 0 !important;
            box-shadow: -0.2rem 0.2rem 0.2rem 0rem rgba(0, 123, 255, 0.25) !important;`;
        resizeMainElements(inputNomTQ, btnTQ);
    }

    const handleFieldBlur = () => {
        const { current: input } = inputNomTQ;
        const { current: btn } = btnTQ;
        if( input.style.borderColor !== 'rgb(217, 48, 37)' && 
            input.style.borderColor !== 'rgb(128, 189, 255)')
            btn.style.cssText += `
            color: #fff;
            display: inline-block;
            background: #00909E !important;
            border: 1.5px solid #000 !important;
            border-left: none !important;
            border-top-right-radius: 30px 30px;
            border-bottom-right-radius: 30px 30px;
            border-top-left-radius: 0px 0px;
            border-bottom-left-radius: 0px 0px;
            box-sizing: border-box;
            box-shadow: none;
            padding: 0 7px;
            transition: ease-in .22s;`;

        resizeMainElements(inputNomTQ, btnTQ);
    }

    const handleFieldChange = () => {
        const { current: input } = inputNomTQ;
        const { current: btn } = btnTQ;
        let inputVal = input.value;
        inputVal = inputVal.replace(/\s/g, "");
        input.value = inputVal;
        if (inputVal === "") {
            setElementsRed();
        }
        else {
            input.setAttribute('style', 'border-color:#80bdff!important;box-shadow: -0.2rem 0.2rem 0.2rem 0rem rgba(76, 175, 80, 0.3) !important;');
            btn.style.cssText += `color: rgb(204, 204, 204); !important;
            background-color: #fff !important;
            border-color: #80bdff !important;
            outline: 0 !important;
            box-shadow: -0.2rem 0.2rem 0.2rem 0rem rgba(0, 123, 255, 0.25) !important;`
        }
        setFields({...fields, tquser: inputVal});
        resizeMainElements(inputNomTQ, btnTQ);
    }

    return (
        <div styleName="main" className="valign-wrapper" style={{ minHeight: '90vh' }}>
            <div styleName="container" className="container valign-wrapper">
                <div className="row">
                    <div className="col">
                        <form
                            onSubmit={handleFormSubmit}
                        >
                            <img
                                styleName="_0x24f8"
                                className="responsive-img"
                                src={logo}
                                draggable="false"
                                alt='tq logo'
                            />
                            <div style={{ width: '100%' }}>
                                <div 
                                    styleName="div-field-tq"
                                    className="input-field"
                                >
                                    <input
                                        placeholder="CREA UN NOMBRE PARA TQ"
                                        id="usrTQ"
                                        name="tquser"
                                        autoComplete="off"
                                        styleName="inputNomTQ"
                                        onChange={handleFieldChange}
                                        onFocus={handleFieldFocus}
                                        onBlur={handleFieldBlur}
                                        ref={inputNomTQ}
                                    />
                                </div>
                                <button
                                    ref={btnTQ}
                                    type="submit"
                                    styleName="btnTQ"
                                    className="btn center-align"
                                    style={{ float: 'left' }}
                                >
                                    <i className="material-icons">chevron_right</i>
                                </button>
                            </div>
                        </form>
                        <div 
                            styleName="div-tq-secondary"
                            className="center"
                        >
                            <button
                                type="button"
                                styleName="_btn-tq"
                                className="btn"
                            >
                                Bandeja
                            </button>
                            <button
                                type="button"
                                styleName="btn-med _btn-tq"
                                className="btn"
                            >
                                Contactos
                            </button>
                            <button 
                                type="button" 
                                styleName="_btn-tq"
                                className="btn"
                            >
                                Ayuda
                                <i
                                    className="material-icons right"
                                    style={{ marginLeft: '3px' }}
                                >
                                    help
                            </i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function resizeMainElements({current: input}, {current: btn}){
    if(null != input && null != btn){
        btn.style.height = input.getBoundingClientRect().height+'px';
        let bodyHeight = document.body.getBoundingClientRect().height;
        let bodyWidth = document.body.getBoundingClientRect().width;
        if(bodyHeight < 627 || bodyWidth < 690){
            document.body.classList.remove('d-scroll');
        }else{
            document.body.classList.add('d-scroll');
        }
    }
}

export default Main;