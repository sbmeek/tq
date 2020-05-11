import React, { useRef, useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext'
import Alert from '../partials/Alert';
import '../../styles/Link.css';
import ft1 from '../../img/link/ft1.png';
import ft2 from '../../img/link/ft2.png';
import ft3 from '../../img/link/ft3.png';
import ft4 from '../../img/link/ft4.png';
import ft5 from '../../img/link/ft5.png';

const A = new Alert();
const M = window.M; // Materialize

export default function Link() {
    const inputLink = useRef(null);
    const { user } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [sldIntervalID, setSldIntervalID] = useState(null);
    const btnLink = useRef(null);

    useEffect(() => {
        (async () => {
            if(user)
                await setName(user.enteredname);
        })();
    }, [user]);

    useEffect(() => {
        startSlider();
    }, []);
    
    const startSlider = () => {
        let elems = document.querySelectorAll('.carousel');
        let instances = M.Carousel.init(elems,{
            indicators: true,
            fullWidth: true,
            numVisible: 4
        });
        let intervalID = setInterval(() => {
            instances[0].next()
        }, 3000);
        setSldIntervalID(intervalID);
    }

    const copyLink = async () => {
        await setLink(`${window.location.origin}/${name}`);
        inputLink.current.select();
        inputLink.current.setSelectionRange(0, 99);
        document.execCommand("copy");
        A.trigger('{{[]: {a$$}}}', {
            sldIntervalID,
            startSlider,
            btnLnk: btnLink.current,
        });
    }

    return (
        <div 
            className="container section"
            styleName="container section"
        >
            <div 
                className="row"
                styleName="row"
            >
                <div 
                    className="col s12"
                    styleName="col"
                >
                    <div 
                        className="carousel carousel-slider" 
                        styleName="carousel"
                        style={{background: 'rgba(29, 30, 31, 0.705)'}}
                    >
                        <div className="carousel-fixed-item center">
                        </div>
                        <div
                            className="carousel-item" 
                            >
                            <img 
                                styleName="carousel-item"
                                src={ft1} 
                                alt="ft1"
                            />
                        </div>
                        <div 
                            className="carousel-item"
                            >
                            <img 
                                styleName="carousel-item"
                                src={ft2}
                                alt="ft2"
                            />
                        </div>
                        <div 
                            className="carousel-item"
                            >
                            <img 
                                styleName="carousel-item"
                                src={ft3}
                                alt="ft3"
                            />
                        </div>
                        <div 
                            className="carousel-item"
                            href="#"
                            >
                            <img 
                                styleName="carousel-item"
                                src={ft4}
                                alt="ft4"
                            />
                        </div>
                        <div 
                            className="carousel-item"
                            href="#"
                        >
                            <img 
                                styleName="carousel-item"
                                src={ft5}
                                alt="ft5" 
                            />
                        </div>
                    </div>
                </div>
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
                        Copia el link aqu&iacute;
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
                    <button 
                        type="button" 
                        styleName="_btn-tq"
                    >
                        Bandeja
                        <i className="material-icons right">
                            inbox
                        </i>
                    </button>
                </div>
            </div>
        </div>
    )
}
