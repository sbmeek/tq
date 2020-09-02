export default {
	Main: {
		InputPlaceholder: 'CREA UN NOMBRE PARA TQ',
		BtnInbox: 'Bandeja',
		BtnContacts: 'Contactos',
		BtnHelp: 'Ayuda',
		BtnInfo: 'Info.',
		AlertUserExpired: 'Este usuario ha expirado',
		AlertUserNotAvailable: 'Este usuario no está disponible',
	},
	Link: {
		BtnCopyLink: 'Copia tu link aquí',
		BtnInbox: 'Bandeja',
		AlertLinkCopied:
			'Tu link sirve para recibir <span style="color: var(--tq-red-03);">mensajes anónimos en bandeja</span>. Compártelo en tus <span style="color: var(--tq-red-03);">redes sociales</span>',
		BtnLinkCopiedToClipboard: 'Link copiado',
	},
	Inbox: {
		NoMessagesInfo: 'Aún no hay nada aquí :(',
		Title: 'Bandeja',
		MsgTab: 'Mensajes',
		AnsTab: 'Respondidos',
    },
    Menu: {
        ModalForNewUsers: "¿Sabías que esto es un menú?"
    },
    TemplateEditor: {
        InputAnswerPlaceholder: "Escribe tu respuesta..."
    },
    AuthModal: {
        FormSignupTitle: "Crea tu cuenta",
        FormSignupSubtitle: "¿Sabías que puedes presionar TAB para cambiar de campo?",
        FormLoginTitle: "Inicia sesión",
        LoginWith: "Regístrate con {OAuth}",
        FormSignupFooter: "¿Ya tienes una cuenta?",
        FormSignupFooterToggler: "Regístrate",
        FormLoginFooter: "¿Aún no tienes una cuenta?",
        FormLoginFooterToggler: "Acceder",
        Signup: {
            Username: "Nombre de usuario",
            Email: "Correo electrónico",
            Pwd: "Contraseña",
            ConfirmPwd: "Confirmación",
            BtnCreateAccount: "Crear cuenta",
            BtnCancel: "Cancelar",
            TermsNConditions: "Términos y condiciones",
            FieldHelper: {
                usernameHelpMsg: "El nombre de usuario debe contener más de 3 caracteres y solo puede contener letras y numeros.",
                emailHelpMsg: 'Recuerde ingresar un email válido ya que le enviaremos un código de verificación de esa manera su cuenta será más segura.',
                pwdHelpMsg: 'La contraseña debe contener mínimo 8 caracteres, al menos una letra mayúscula y una minúscula.',
                cpwdHelpMsg: 'AYDIMIMADRE! Como que la confirmacion y la contraseña no se parecen D:'
            },
            Signedup: {
                title: "Te haz registrado exitosamente",
                helpText: "El próximo paso es verificar su correo electrónico, debe ingresar a su cuenta de email y acceder al enlace que le hemos enviado.",
                logInBtn: "Iniciar sesión"
            }
        },
        Login: {
            UsernameOrEmail: "Nombre de usuario o email",
            Pwd: "Contraseña",
            BtnLogin: "Acceder",
            BtnCancel: "Cancelar"
        }
    }
}
