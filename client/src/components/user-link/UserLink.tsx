import React, { useRef, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, RootStateOrAny } from 'react-redux';
import { InitContext } from '../../global/context/InitContext';
import Slider from 'components/link/Slider';
import Modal from 'components/link/Modal';
import copy from 'assets/images/icons/icons-inbox/icon-link.svg';
import tqIcon from 'assets/images/msg/profile-tq.png';
import {
	Container,
	InnerContainer,
	Column,
	UserLinkInput,
	BtnHelp,
	BtnTQ,
	BtnCopyLink
} from './UserLink.style';

export default function UserLink() {
	const inputLink = useRef<HTMLInputElement>(null);
	const { user } = useSelector((store: RootStateOrAny) => store.auth);
	const [name, setName] = useState('');
	const [link, setLink] = useState('');
	const [showPlaceholder, setShowPlaceholder] = useState(false);
	const [showCopiedLinkMsg, setShowCopiedLinkMsg] = useState(false);
	const [showModal, setShowModal] = useState(false);
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
		(async () => {
			if (user) {
				await setName(user.enteredname);
			}
		})();
	}, [user]);

	const copyLink = async () => {
		await setLink(`${window.location.origin}/${name}`);
		inputLink.current!.select();
		inputLink.current!.setSelectionRange(0, 99);
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
						<BtnCopyLink type="button" ref={btnLink} onClick={copyLink}>
							{showCopiedLinkMsg ? (
								<>{lang['BtnLinkCopiedToClipboard']}</>
							) : (
								<>
									<span> {lang['BtnCopyLink']} </span>
									<img src={copy} alt="copy" />
								</>
							)}
						</BtnCopyLink>
						<BtnHelp onClick={() => setShowModal(true)} isVisible={!showModal}>
							?
						</BtnHelp>
						<Modal
							modalTxt={`${lang['AlertLinkCopied']}.`}
							showModal={showModal}
							setShowModal={setShowModal}
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
						<BtnTQ type="button">
							<span>{lang['BtnInbox']}</span>
							<img src={tqIcon} alt="logo" />
						</BtnTQ>
					</Link>
				</Column>
			</InnerContainer>
		</Container>
	);
}
