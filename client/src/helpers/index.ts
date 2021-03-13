import LangsEnum from 'lang/LangsEnum';

type LangDataType = {
	[LangsEnum.es]: { [key: number]: string } | any | undefined;
	[LangsEnum.en]: { [key: number]: string } | any | undefined;
};

export function getDataByLang(data: LangDataType) {
	const selectedLang = localStorage.getItem('selectedLang');

	switch (selectedLang) {
		case LangsEnum.es:
			return data[LangsEnum.es];
		default:
			return data[LangsEnum.en];
	}
}
