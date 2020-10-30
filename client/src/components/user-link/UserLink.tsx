import React, { useRef, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, RootStateOrAny } from 'react-redux';
import { InitContext } from '../../global/context/InitContext';
import Slider from './slider/Slider';
import Dialog from './dialog/Dialog';
import clipboardIcon from 'assets/images/icons/icons-inbox/icon-link.svg';
import tqIcon from 'assets/images/msg/profile-tq.png';
import {
	Container,
	InnerContainer,
	Column,
	UserLinkInput,
	BtnHelp,
	btnCustomStyle,
	btnCopyLinkCustomStyle
} from './UserLink.style';
import Button from 'shared/button/Button';

export default function UserLink() {
	const inputLink = useRef<HTMLInputElement>(null);
	const { user } = useSelector((store: RootStateOrAny) => store.auth);
	const [name, setName] = useState('');
	const [link, setLink] = useState('');
	const [showPlaceholder, setShowPlaceholder] = useState(false);
	const [showCopiedLinkMsg, setShowCopiedLinkMsg] = useState(false);
	const [showHelpDialog, setShowHelpDialog] = useState(false);
	const btnLink = useRef(null);

	const {
		state: {
			lang: { Link: lang }
		}
	} = useContext(InitContext);

	useEffect(() => {
		if (showPlaceholder) {
			console.log('rendered');
		}
	}, [showPlaceholder]);

	useEffect(() => {
		setName(user.enteredname || '');
	}, [user]);

	const copyLink = async () => {
		const link = `${window.location.origin}/${name}`;
		const { current: inputLinkCurr } = inputLink;
		setLink(link);
		inputLinkCurr!.value = link;
		inputLinkCurr!.select();
		inputLinkCurr!.setSelectionRange(0, 99);
		document.execCommand('copy');
		setShowCopiedLinkMsg(true);
		setTimeout(() => setShowCopiedLinkMsg(false), 7000);
	};

	return (
		<Container>
			<Slider setShowPlaceholder={setShowPlaceholder} />
			<InnerContainer>
				<Column margin="0 0 15px 0">
					<div>
						<Button
							group="secondary"
							hoverMode={showCopiedLinkMsg ? 'color' : 'translate'}
							type="button"
							ref={btnLink}
							onClick={copyLink}
							customStyle={btnCopyLinkCustomStyle}
							customStyleProps={{ showCopiedLinkMsg }}
						>
							{showCopiedLinkMsg ? (
								<>{lang['BtnLinkCopiedToClipboard']}</>
							) : (
								<>
									<span> {lang['BtnCopyLink']} </span>
									<img src={clipboardIcon} alt="clipboardIcon" />
								</>
							)}
						</Button>
						<BtnHelp
							onClick={() => setShowHelpDialog(true)}
							isVisible={!showHelpDialog}
						>
							?
						</BtnHelp>
						<Dialog
							modalTxt={`${lang['AlertLinkCopied']}.`}
							showModal={showHelpDialog}
							setShowModal={setShowHelpDialog}
						/>
					</div>
					<UserLinkInput
						type="text"
						value={link}
						aria-hidden="true"
						ref={inputLink}
						readOnly={true}
					/>
				</Column>
				<Column>
					<Link to="/messages">
						<Button
							type="button"
							group="primary"
							hoverMode="translate"
							customStyle={btnCustomStyle}
						>
							<span>{lang['BtnInbox']}</span>
							<img src={tqIcon} alt="logo" />
						</Button>
					</Link>
				</Column>
			</InnerContainer>
		</Container>
	);
}
