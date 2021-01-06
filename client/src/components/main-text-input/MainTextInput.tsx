import React, {
	useRef,
	useContext,
	FocusEvent,
	KeyboardEvent,
	ChangeEvent
} from 'react';
import { InitContext } from 'global/context/InitContext';
import arrow from 'assets/images/icons/icons-main/icon-arrow.svg';
import { Textarea, MainBtn } from './MainTextInput.style';

export default function MainTextInput<
	T extends {
		username: string;
		setUsername: React.Dispatch<React.SetStateAction<string>>;
		inputMode: boolean;
		setInputMode: React.Dispatch<React.SetStateAction<boolean>>;
		showSubmitBtn: boolean;
		setShowSubmitBtn: React.Dispatch<React.SetStateAction<boolean>>;
		tqForm: React.RefObject<HTMLFormElement>;
	}
>({
	username,
	setUsername,
	inputMode,
	setInputMode,
	showSubmitBtn,
	setShowSubmitBtn,
	tqForm
}: T) {
	const tqField = useRef<HTMLTextAreaElement>(null);
	const isFieldDisabled = useRef(false);

	const {
		state: {
			lang: { Main: lang }
		}
	} = useContext(InitContext);

	const formatVal = (val: string): string => {
		let l = val.length;
		return val!.slice(0, l - (l - 20)) as string;
	};

	const handleFieldChange = (
		e: ChangeEvent<HTMLTextAreaElement> & KeyboardEvent<HTMLTextAreaElement>
	) => {
		const curr = tqForm.current!;
		const targetElement = e.target as HTMLTextAreaElement;
		console.log(e.key);
		if (e.key === 'Enter') {
			curr.dispatchEvent(new Event('submit', { cancelable: true }));
			curr.disabled = true;
			isFieldDisabled.current = true;
		}
		if (!isFieldDisabled.current) {
			let { value: val } = targetElement;
			val = val.match(/^[a-zA-Z0-9-\s]*$/) ? val : username;
			val = val.replace(
				/\s/g,
				val[0] !== ' ' &&
					val[targetElement.selectionStart] !== '-' &&
					val[targetElement.selectionStart - 2] !== '-'
					? '-'
					: ''
			);
			setUsername(formatVal(val));
			setShowSubmitBtn(val.length > 0);
		}
	};

	const handleFieldFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
		setInputMode(!(e.type === 'blur' && username.length === 0));
		if (e.type === 'focus') tqField.current!.focus();
	};

	return (
		<>
			<Textarea
				value={username}
				id="usrTQ"
				data-name="tquser"
				isInputMode={inputMode}
				data-type={inputMode ? 'text' : 'button'}
				onChange={handleFieldChange}
				onFocus={handleFieldFocus}
				onBlur={handleFieldFocus}
				onKeyPress={handleFieldChange}
				ref={tqField}
				spellCheck="false"
				autoComplete="off"
				maxLength={20}
				placeholder={!inputMode ? lang['InputPlaceholder'] : ''}
				data-testid="username-field"
			></Textarea>
			{showSubmitBtn && (
				<MainBtn type="submit" data-testid="btn-submit">
					<img src={arrow} alt="arrow" />
				</MainBtn>
			)}
		</>
	);
}
