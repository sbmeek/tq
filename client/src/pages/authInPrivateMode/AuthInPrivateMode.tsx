import React, { useState, useEffect, useContext } from 'react';
import logo from 'assets/images/ltqrNEW.png';
import { LoaderEye } from 'components/loader/Loader';
import Axios from 'axios';
import { InitContext, ActionEnum } from 'global/context/InitContext';

import {
	Container,
	ContainerEyeLoader,
	FieldContainer,
	Form,
	KeyField,
	Logo
} from './AuthInPrivateMode.style';

let timerID: number;

export const checkTst = async (val: string | 'tq_check_tst_init') => {
	const res = await Axios.post('/user/tst_check', {
		enteredKey: val
	});
	return res.data.isTester;
};

export default function ValdTester() {
	const [isLoading, setIsLoading] = useState(false);
	const [isErrored, setIsErrored] = useState(false);
	const { state, dispatch } = useContext(InitContext);
	const lang = state.lang.AuthInPrivateMode;

	useEffect(() => {
		(async () => {
			const isTester = await checkTst('tq_check_tst_init');
			dispatch({
				type: ActionEnum.SET_IS_TESTER,
				payload: { isTester }
			});
		})();
	}, [dispatch]);

	const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const targetElement = e.target as HTMLInputElement;
		clearTimeout(timerID);
		if (targetElement.value) {
			timerID = setTimeout(() => {
				setIsLoading(true);
				setTimeout(async () => {
					const isTester = await checkTst(targetElement.value);
					if (!isTester) {
						setIsErrored(true);
						dispatch({
							type: ActionEnum.SET_IS_TESTER,
							payload: { isTester: false }
						});
					} else {
						dispatch({
							type: ActionEnum.SET_IS_TESTER,
							payload: { isTester: true }
						});
					}
					setIsLoading(false);
				}, 800);
			}, 800);
		}
	};

	return (
		<Container>
			<Form onSubmit={(e) => e.preventDefault()}>
				<Logo src={logo} alt="tq" draggable="false" />
				<p>{lang['Msg']}</p>
				<FieldContainer isErrored={isErrored}>
					<KeyField
						onChange={handleKeyChange}
						type="text"
						autoFocus
						spellCheck="false"
						autoComplete="off"
					/>
					{isLoading && (
						<ContainerEyeLoader>
							<LoaderEye size={'3%'} />
						</ContainerEyeLoader>
					)}
				</FieldContainer>
			</Form>
		</Container>
	);
}
