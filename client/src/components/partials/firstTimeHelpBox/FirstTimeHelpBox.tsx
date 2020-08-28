import React, { useContext } from 'react'
import './FirstTimeHelpBox.css';
import { InitContext } from 'global/context/InitContext';

export default function FirstTimeModal<T extends { active: boolean }>({ active }: T) {
    const { Menu: lang } = useContext(InitContext).state.lang

    return (
        <div  styleName={`container ${active ? 'active' : ''}`}>
            <div styleName={`modal ${active ? 'active' : ''}`}>
                <span>{lang["ModalForNewUsers"]}</span>
            </div>
        </div>
    )
}
