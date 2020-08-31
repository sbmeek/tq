import React, { useContext } from 'react'
import styles from './FirstTimeHelpBox.css'
import { InitContext } from 'global/context/InitContext'

export default function FirstTimeModal<T extends { active: boolean }>({
	active,
}: T) {
	const { Menu: lang } = useContext(InitContext).state.lang

	const transitionEndHandler = (e: React.TransitionEvent<HTMLDivElement>) => {
        const targetElement = e.target as HTMLDivElement
        if (!targetElement.classList.contains(styles['active']) && !active)
			targetElement.remove();
    }

	return (
		<div
			onTransitionEnd={transitionEndHandler}
            styleName={`container ${active ? 'active' : ''}`}
		>
			<div styleName={`modal ${active ? 'active' : ''}`}>
				<span>{lang['ModalForNewUsers']}</span>
			</div>
		</div>
	)
}
