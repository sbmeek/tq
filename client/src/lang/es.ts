export default {
	Root: {
		BtnCreateUsername: 'Crear nombre de usuario',
		Section1: {
			BtnLogin: 'Entrar',
			Title: 'Mensajes anónimos',
			Paragraph:
				'Recibe <span style="color: var(--tq-blue-01)">mensajes anónimos</span> y compártelos en tus estados de forma <span style="color: var(--tq-blue-01)">rápida y sencilla</span>.'
		},
		Section2: {
			Title: 'Cuenta temporal',
			Paragraph:
				'Para recibir <span style="color: var(--tq-blue-01);">mensajes anónimos</span> rápidamente, no necesita registrarse, solo necesita un <span style="color: var(--tq-blue-01);">nombre de usuario</span>.'
		},
		Section3: {
			Title: 'Stickers y etiquetas',
			Paragraph:
				'Acompaña tus <span style="color: var(--tq-blue-01);">respuestas</span> con <span style="color: var(--tq-blue-01);">stickers y etiquetas</span>.'
		},
		Section4: {
			Title: 'Donde quieras, cuando quieras',
			Paragraph:
				'Utilice <span style="color: var(--tq-blue-01);">TiKiu</span> en el <span style="color: var(--tq-blue-01);">dispositivo móvil</span> que desee.'
		},
		Section5: {
			Title: 'Empiece a recibir mensajes anónimos ahora mismo'
		},
		Footer: {
			Group1: {
				Title: 'Producto',
				Items: ['Descargar', 'Por qué TiKiu', 'Información']
			},
			Group2: {
				Title: 'Compañía',
				Items: ['Sobre nosotros', 'Marca']
			},
			Group3: {
				Title: 'Recursos',
				Items: ['Soporte técnico', 'Ayuda', 'Seguridad']
			},
			Group4: {
				Title: 'Políticas',
				Items: ['Términos & Condiciones', 'Privacidad']
			}
		}
	},
	Main: {
		InputPlaceholder: 'Crear nombre de usuario',
		BtnInbox: 'Bandeja',
		BtnContacts: 'Contactos',
		BtnHelp: 'Ayuda',
		BtnInfo: 'Info.',
		AlertUserExpired: 'Este usuario ha expirado',
		AlertUserNotAvailable: 'Este usuario no está disponible'
	},
	AuthInPrivateMode: {
		Msg: 'Esta es una versión privada de TQ. Introduzca su código de acceso.'
	},
	Link: {
		BtnCopyLink: 'Copia tu link aquí',
		BtnInbox: 'Bandeja',
		AlertLinkCopied:
			'Tu link sirve para recibir <span style="color: var(--tq-red-03);">mensajes anónimos en bandeja</span>. Compártelo en tus <span style="color: var(--tq-red-03);">redes sociales</span>',
		BtnLinkCopiedToClipboard: 'Link copiado'
	},
	MsgIdx: {
		FirstRowText: 'Te invitó a que le envíes un',
		SecondRowText: 'mensaje anónimo',
		FieldPlaceholder: 'Escribe tu mensaje'
	},
	MsgSent: {
		Thanks: 'Gracias por mandar tu mensaje.',
		Again: 'Enviar otro mensaje',
		Home: 'Inicio'
	},
	Inbox: {
		NoMessagesInfo: 'Aún no hay nada aquí :(',
		Title: 'Inbox',
		MsgTab: 'Mensajes',
		BtnAnswer: 'Responder',
		AnsTab: 'Respondidos',
		TitleRep: '¿Estás seguro que deseas responder este mensaje?',
		BtnCancel: 'Cancelar',
		Note: 'Nota: Una vez que la respuesta ha sido enviada no podrá ser editada.'
	},
	Menu: {
		ModalForNewUsers: '¿Sabías que esto es un menu?',
		Title: 'Menu',
		HomeOpt: 'Inicio',
		InboxOpt: 'Bandeja',
		SignInOpt: 'Ingresar',
		LogOutOpt: 'Rodar',
		BtnTerms: 'Términos y Condiciones'
	},
	TemplateEditor: {
		InputAnswerPlaceholder: 'Escribe tu respuesta...',
		Message: 'Mensaje',
		Colors: 'Colores',
		Label: 'Etiquetas'
	},
	AuthModal: {
		FormSignupTitle: 'Crea tu cuenta',
		FormSignupSubtitle:
			'¿Sabías que puedes presionar TAB para cambiar de campo?',
		FormLoginTitle: 'Inicia sesión',
		SignupWith: 'Regístrate con {OAuth}',
		LoginWith: 'Inicia sesión con {OAuth}',
		FormSignupFooter: '¿Ya tienes una cuenta?',
		FormSignupFooterToggler: 'Regístrate',
		FormLoginFooter: '¿Aún no tienes una cuenta?',
		FormLoginFooterToggler: 'Acceder',
		Signup: {
			Username: 'Nombre de usuario',
			Email: 'Correo electrónico',
			Pwd: 'Contraseña',
			ConfirmPwd: 'Confirmación',
			BtnCreateAccount: 'Crear cuenta',
			BtnCancel: 'Cancelar',
			TermsNConditions: 'Términos y condiciones',
			FieldHelper: {
				usernameHelpMsg:
					'El nombre de usuario debe contener más de 3 caracteres y menos de 20 (Solo puede contener letras y numeros.)',
				emailHelpMsg:
					'Recuerde ingresar un email válido ya que le enviaremos un código de verificación de esa manera su cuenta será más segura.',
				pwdHelpMsg:
					'La contraseña debe contener mínimo 8 caracteres, al menos una letra mayúscula y una minúscula.',
				cpwdHelpMsg:
					'AYDIMIMADRE! Como que la confirmacion y la contraseña no se parecen D:'
			},
			Signedup: {
				title: 'Te haz registrado exitosamente',
				helpText:
					'El próximo paso es verificar su correo electrónico, debe ingresar a su cuenta de email y acceder al enlace que le hemos enviado.',
				logInBtn: 'Iniciar sesión'
			}
		},
		Login: {
			UsernameOrEmail: 'Nombre de usuario o email',
			CredentialsErrMsg:
				'Credenciales incorrectas, verifique e intentelo de nuevo.',
			EmptyFieldsErrMsg: 'No llenó todos los campos.',
			EmailNotVerified:
				'Ha digitado sus credenciales correctamente, pero necesitamos que confirme su correo electrónico antes de iniciar sesión.',
			Pwd: 'Contraseña',
			BtnLogin: 'Acceder',
			BtnCancel: 'Cancelar'
		}
	},
	VerifyAccount: {
		TitleIsVerificationOk: 'Confirmación completada',
		TitleIsVerificationNotOk: 'Hubo un problema',
		TextIsVerificationOk: 'Ahora puede acceder a su cuenta.',
		TextIsVerificationNotOk:
			'El enlace es inválido. Al parecer ya ha confirmado su correo electrónico, si es así no es necesario que lo haga de nuevo.',
		LogInBtn: 'Iniciar sesión'
	}
};
