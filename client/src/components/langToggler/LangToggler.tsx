import React, { useContext, useState } from 'react';
import { ActionEnum, InitContext } from 'global/context/InitContext';
import { getDataByLang } from 'helpers';
import LangsEnum from 'lang/LangsEnum';
import arrowFooter from 'assets/images/presentation/arrow_lang-toggler.svg';
import {
	LangTogglerWrapper,
	FlagLangToggler,
	Dropdown,
	DropdownItem
} from './LangToggler.style';

export default function LangToggler() {
	const [showDropdown, setShowDropdown] = useState(false);
	const { state, dispatch } = useContext(InitContext);

	const getLangInfo = () => {
		return getDataByLang(state.availableLangs);
	};

	const handleLangClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const { dataset } = e.target as HTMLDivElement;
		const selectedLocale = dataset['locale'] || LangsEnum.en;

		localStorage.setItem('selectedLang', selectedLocale);

		dispatch({
			type: ActionEnum.SET_LANG,
			payload: { langSelected: selectedLocale }
		});
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
							<span>{lang[1].title}</span>
						</DropdownItem>
					))}
				</Dropdown>
			)}
			<FlagLangToggler src={getLangInfo().flag} alt="flag" />
			<span>{getLangInfo().title}</span>
			<img src={arrowFooter} alt="arrow_lang-toggler" />
		</LangTogglerWrapper>
	);
}
