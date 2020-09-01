import User from 'models/User'

const isEmail = (email: string) => {
	const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return regex.test(String(email).toLowerCase())
}

const validatePwd = (pwd: string, cpwd: string) => {
	//At least one upper AND one lower
	const regexPwd = /^(?=.*[A-Z])(?=.*[a-z])/

	const errors = {
		//Password and Confirm didn't match
		pwdNConfirmMatch: true,
		//Password length at least 8 chars
		pwdLength: true,
		//Pass regexPwd test
		pwdRegexUpperLower: true,
	}

	if (pwd !== cpwd) errors.pwdNConfirmMatch = false
	if (pwd !== undefined && pwd.length < 8) errors.pwdLength = false
	if (!regexPwd.test(pwd)) errors.pwdRegexUpperLower = false

	return errors
}

const valdUsername = async (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9]*$/

    const errors = {
		//Username length at least 3 chars
        userLength: true,
        //Username cannot contain special chars
        userRegex: true,
        //Is username available?
        isUsernameAvailable: true 
    }

    const user = await User.findOne({ enteredname: username.toLowerCase() });
    if(user) errors.isUsernameAvailable = false

    if(username.length < 3) errors.userLength = false;
    if(!usernameRegex.test(username)) errors.userRegex = false;

    return errors
}

// Run Validators
export default async function ಠ_ಠ<
	T extends {
        username: string,
		email: string
		pwd: string
		cpwd: string
	}
>({ username, email, pwd, cpwd }: T) {
	let errors: { [key: string]: boolean } = {
        isEmailValid: true,
    }
    
    if (!isEmail(email)) errors.isEmailValid = false

    const pwdValidations = validatePwd(pwd, cpwd);
    const usernameValds = await valdUsername(username);

    errors = { ...errors, ...pwdValidations, ...usernameValds };

    for(const e in errors){
        if(!errors[e])
            return { ...errors, ok: false }
    }

    return { errors: null, ok: true }
}
