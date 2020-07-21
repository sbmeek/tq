import React from 'react';
import './Labels.css';

export default function Labels() {
    return (
        <div styleName="labels-container">
            <div styleName="label"><span role="img" aria-label="seen">✔️</span></div>
            <div styleName="label"><span role="img" aria-label="heart">❤️</span></div>
            <div styleName="label"><span role="img" aria-label="star">🌟</span></div>
            <div styleName="label"><span role="img" aria-label="fire">🔥</span></div>
            <div styleName="label"><span role="img" aria-label="water-drop">💧</span></div>
        </div>
    )
}
