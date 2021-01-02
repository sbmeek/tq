export default {
	Root: {
		BtnCreateUsername: 'Create username',
		Section1: {
			Title: 'Anonymous messages',
			Paragraph:
				'Get <span style="color: var(--tq-blue-01)">anonymous messages</span> and share them in your stories in a <span style="color: var(--tq-blue-01)">fast and simple</span> way.'
		},
		Section2: {
			Title: 'Temporal account',
			Paragraph: `To get <span style="color: var(--tq-blue-01);">anonymous messages</span> quickly, you don't need to register, you'll need an <span style="color: var(--tq-blue-01);">username</span> only.`
		},
		Section3: {
			Title: 'Stickers and labels',
			Paragraph:
				'Add <span style="color: var(--tq-blue-01);">stickers and labels</span> to your <span style="color: var(--tq-blue-01);">answers</span>.'
		}
	},
	Main: {
		InputPlaceholder: 'CREATE AN USERNAME FOR TQ',
		BtnInbox: 'Inbox',
		BtnContacts: 'Contacts',
		BtnHelp: 'Help',
		BtnInfo: 'Info.',
		AlertUserExpired: 'This user has expired',
		AlertUserNotAvailable: 'This user is not available'
	},
	AuthInPrivateMode: {
		Msg: 'This is a TQ private version. Enter your access code.'
	},
	Link: {
		BtnCopyLink: 'Copy your link here',
		BtnInbox: 'Inbox',
		AlertLinkCopied:
			'Your link is used to receive <span style="color: var(--tq-red-03);">anonymous messages in inbox</span>. Share it on your <span style="color: var(--tq-red-03);">social networks</span>',
		BtnLinkCopiedToClipboard: 'Link copied to clipboard',
		BtnInfo: 'Info.'
	},
	MsgIdx: {
		FirstRowText: 'Invited you to send him/her an',
		SecondRowText: 'anonymous message',
		FieldPlaceholder: 'Type your message'
	},
	Inbox: {
		NoMessagesInfo: "There isn't nothing here yet :(",
		Title: 'Inbox',
		MsgTab: 'Messages',
		AnsTab: 'Answered',
		ReplyingModal: {
			Title: 'Are you sure you want to send this message?',
			BtnCancel: 'Cancel',
			BtnAnswer: 'Answer',
			Note: 'Note: Once an answer is sent it cannot be edited.'
		}
	},
	Menu: {
		ModalForNewUsers: 'Did you know this is a menu?',
		Title: 'Menu',
		HomeOpt: 'Home',
		InboxOpt: 'Inbox',
		SignInOpt: 'Sign in',
		LogOutOpt: 'Log out',
		BtnTerms: 'Terms and Conditions'
	},
	TemplateEditor: {
		InputAnswerPlaceholder: 'Type your answer...'
	},
	AuthModal: {
		FormSignupTitle: 'Create your account',
		FormSignupSubtitle: 'Did you know that you can press TAB to change field?',
		FormLoginTitle: 'Log in',
		LoginWith: 'Log in with {OAuth}',
		SignupWith: 'Sign up with {OAuth}',
		FormSignupFooter: 'Already have an account?',
		FormSignupFooterToggler: 'Sign up',
		FormLoginFooter: 'Not registered yet?',
		FormLoginFooterToggler: 'Log in',
		Signup: {
			Username: 'Username',
			Email: 'Email address',
			Pwd: 'Password',
			ConfirmPwd: 'Confirm',
			BtnCreateAccount: 'Create account',
			BtnCancel: 'Cancel',
			TermsNConditions: 'Terms and conditions',
			FieldHelper: {
				usernameHelpMsg:
					'The username must have at least 3 characters, and can only have letters and numbers.',
				emailHelpMsg:
					'Remember to enter a valid email as we will send you a verification code that way your account will be safer.',
				pwdHelpMsg:
					'The password must have a minimum of 8 characters, at least a capital letter and a lower case one.',
				cpwdHelpMsg:
					'AYDIMIMADRE! Como que la confirmacion y la contraseña no se parecen D:'
			},
			Signedup: {
				title: 'You have successfully registered',
				helpText:
					"Next step is verify your email address, for that you must log in to your email address account and click the link that we've just sent.",
				logInBtn: 'Log in'
			}
		},
		Login: {
			CredentialsErrMsg: 'Incorrect credentials, check and try again.',
			EmptyFieldsErrMsg: "You didn't fill every fields.",
			EmailNotVerified:
				'Your credentials are correct, but we need you to confirm your email before logging in.',
			UsernameOrEmail: 'Username or email',
			Pwd: 'Password',
			BtnLogin: 'Log in',
			BtnCancel: 'Cancel'
		}
	},
	VerifyAccount: {
		TitleIsVerificationOk: 'Confirmation completed',
		TitleIsVerificationNotOk: 'There is a problem',
		TextIsVerificationOk: 'Now you can log into your account.',
		TextIsVerificationNotOk:
			'The link is invalid. It looks like you have already confirmed your email if so it is not needed that you do it again.',
		LogInBtn: 'Log in'
	}
};
