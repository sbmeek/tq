import React, { useContext, useState } from 'react';
import { ActionEnum, InitContext } from 'global/context/InitContext';

import arrowFooter from 'assets/images/presentation/arrow_lang-toggler.svg';

import {
	LangTogglerWrapper,
	FlagLangToggler,
	Dropdown,
	DropdownItem
} from './LangToggler.style';

export default function LangToggler() {
	const [showDropdown, setShowDropdown] = useState(false);
	const [showArrow, setShowArrow] = useState(false);
	const { state, dispatch } = useContext(InitContext);

	const getLangInfo = () => {
		switch (state.langSelected) {
			case 'es':
				return state.availableLangs['es'];
			default:
				return state.availableLangs['en'];
		}
	};

	const handleLangClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const { dataset } = e.target as HTMLDivElement;
		const selectedLocale = dataset['locale'] || 'en';

		localStorage.setItem('selectedLang', selectedLocale);

		dispatch({
			type: ActionEnum.SET_LANG,
			payload: { langSelected: selectedLocale }
		});
		if (showDropdown) {
			console.log('abri');
		}
	};
	const handleChange = () => {
		if (!showArrow) {
		}
	};

	return (
		<LangTogglerWrapper onClick={() => setShowDropdown(!showDropdown)}>
			{showDropdown && (
				<Dropdown>
					{Object.entries(state.availableLangs).map((lang: any) => (
						<DropdownItem
							onClick={handleLangClick}
							key={lang[0]}
							data-locale={lang[0]}
						>
							<img src={lang[1].flag} alt="lang-flag" />
							<p>{lang[1].title}</p>
						</DropdownItem>
					))}
				</Dropdown>
			)}
			<FlagLangToggler src={getLangInfo().flag} alt="flag" />
			<p>{getLangInfo().title}</p>
			<img
				style={{ transform: showDropdown ? 'rotateX(153deg)' : '' }}
				src={arrowFooter}
				alt="arrow_lang-toggler"
			/>
		</LangTogglerWrapper>
	);
}
