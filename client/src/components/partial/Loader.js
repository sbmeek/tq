import React, { useEffect, useRef } from 'react'

const Loader = () => {

    const wait = useRef(null);

    const dots = () => {
        window.setInterval(function() {
            if(wait.current !== null){
                let {current} = wait;
                if (current.innerHTML.length >= 3) 
                    current.innerHTML = "";
                else 
                    current.innerHTML += ".";
            }
        }, 100);
    }
    
    useEffect(() => {
    dots()
    }, [wait]);

    return (
        <div 
        style={{
            fontSize: '150px',
            opacity: '1',
            position: 'fixed',
            backgroundColor: '#FFF',
            zIndex: "24",
            width: '100%',
            minWidth: '110vh',
            minHeight: '110vh'
        }}
        className="valign-wrapper"
        >
            <div 
                className="center-align"
                style={{width: '100%'}}
            >
                <h1 style={{color: '#000'}}>Cargando<span ref={wait}>...</span></h1>
            </div>
        </div>
    )
}

export default Loader;
