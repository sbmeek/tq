import React, { useRef, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { InitContext } from '../../global/context/InitContext';
import Alert from '../partials/Alert';
import Slider from "./slider.js";
import './slider.css';
import './Link-idx.css';


const A = new Alert();
const M = window.M; // Materialize


export default function LinkIdx() {
    const inputLink = useRef(null);
    const { user } = useSelector(store => store.auth);
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const btnLink = useRef(null);
    const { state: { lang: { Link: lang } } } = useContext(InitContext);

    useEffect(() => {
        (async () => {
            if(user)
                await setName(user.enteredname);
        })();
    }, [user]);

    

    const copyLink = async () => {
        await setLink(`${window.location.origin}/${name}`);
        inputLink.current.select();
        inputLink.current.setSelectionRange(0, 99);
        document.execCommand("copy");
        A.trigger(`${lang["AlertLinkCopied"]}.`, {
          
            btnLnk: btnLink.current,
        });
    }

    return (
        <div 
            className="container section"
            styleName="container section"
        >
           <div>
               <Slider />
           </div>
           
            <div 
                className="center"
            >
                <div 
                    className="col s12"
                    styleName="col"
                >
                    <button 
                        type="button" 
                        className="btn waves-effect waves-light"
                        styleName="btn-waves-effect-waves-light"
                        ref={btnLink}
                        onClick={copyLink}
                    >
                        {lang["BtnCopyLink"]}
                        <i className="material-icons right">
                            link
                        </i>
                    </button>
                    <input 
                        type="text" 
                        value={link}
                        styleName="_tq-link-user" 
                        aria-hidden="true"
                        ref={inputLink}
                        readOnly={true}
                    />
                </div>
                <div 
                    className="col s12"
                    styleName="col"
                >
                    <Link to="/messages" >
                        <button 
                            type="button" 
                            styleName="_btn-tq"
                        >
                            {lang["BtnInbox"]}
                            <i className="material-icons right">
                                inbox
                            </i>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
