import React, { useState, useEffect } from 'react'
import styles from './AuthTester.css'
import logo from 'assets/images/ltqrNEW.png'
import { LoaderEye } from 'components/partials/loader/Loader'
import Axios from 'axios'

let timerID: NodeJS.Timeout

export default function ValdTester<
	T extends {
		setIsTester: React.Dispatch<React.SetStateAction<boolean>>
	}
>({ setIsTester }: T) {
    const [isLoading, setIsLoading] = useState(false)
    const [isCodeValid, setIsCodeValid] = useState(false);
    
    useEffect(() => {
        setIsTester(isCodeValid)
    }, [isCodeValid, setIsTester])

    useEffect(() => {
        (async () => {
            const isTester = await checkTst('tq_check_tst_init');
            setIsCodeValid(isTester);
        })();
    }, [])

    const checkTst = async (val: string | 'tq_check_tst_init') => {
        const res = await Axios.post('/user/tst_check', {
            enteredKey: val,
        })
        return res.data.isTester;
    }

	const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const targetElement = e.target as HTMLInputElement
		clearTimeout(timerID)
		if (targetElement.value) {
			timerID = setTimeout(() => {
				setIsLoading(true)
				setTimeout(async () => {
                    const isTester = await checkTst(targetElement.value);
					if (!isTester) {
						targetElement.parentElement!.classList.add(styles['errored'])
                    } 
                    else {
						setIsCodeValid(true)
					}
					setIsLoading(false)
				}, 800)
			}, 800)
		}
    }

	return (
		<div styleName="container">
			<form styleName="form" onSubmit={(e) => e.preventDefault()}>
				<img styleName="logo" src={logo} alt="tq" draggable="false" />
				<p>TQ se encuentra en modo test. Digite su código.</p>
				<div>
					<input
						onChange={handleKeyChange}
						styleName="key-field"
						type="text"
						autoFocus
						spellCheck="false"
						autoComplete="off"
					/>
					{isLoading && (
						<div styleName="container-eye-loader">
							<LoaderEye size={'3%'} />
						</div>
					)}
				</div>
			</form>
		</div>
	)
}
