import React, { useContext } from 'react';
import { InitContext } from 'global/context/InitContext';
import { Container, Dialog } from './FirstTimeHelpBox.style';

export default function FirstTimeModal<T extends { active: boolean }>({
	active
}: T) {
	const { Menu: lang } = useContext(InitContext).state.lang;

	const transitionEndHandler = (e: React.TransitionEvent<HTMLDivElement>) => {
		console.log(e, 'transition end');
	};

	return (
		<Container onTransitionEnd={transitionEndHandler} isActive={active}>
			<Dialog isActive={active}>
				<span>{lang['ModalForNewUsers']}</span>
			</Dialog>
		</Container>
	);
}
