import React from 'react'
import '../../styles/App.css';

export default function Footer() {
    return (
        <footer 
            styleName="page-footer" 
            style={{minHeight:'10vh'}}
        >
            <div className="container">
                <div 
                    className="row" 
                    style={{marginBottom: '0px!important'}}
                >
                    <div className="center-align">
                        <span 
                            className="white-text"
                            styleName="footer-sbm"
                        >SB Meek Company
                    </span>
                    <p styleName="footer-text">
                        &copy; All rights reserved ({new Date().getFullYear()})
                        <span className="red-text">
                            <span id="date-n-time"></span>
                        </span> {/*debug*/}
                        <span className="blue-text">
                            Connections: 
                            <span id="active-connections">
                            </span>
                        </span> {/*debug*/}
                    </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
