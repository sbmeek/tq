import React, { useState, useEffect, useContext } from 'react'
import styles from './AuthTester.css'
import logo from 'assets/images/ltqrNEW.png'
import { LoaderEye } from 'components/partials/loader/Loader'
import Axios from 'axios'
import { InitContext, ActionEnum } from 'global/context/InitContext'

let timerID: NodeJS.Timeout

export const checkTst = async (val: string | 'tq_check_tst_init') => {
    const res = await Axios.post('/user/tst_check', {
        enteredKey: val,
    })
    return res.data.isTester;
}

export default function ValdTester() {
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useContext(InitContext)

    useEffect(() => {
        (async () => {
            const isTester = await checkTst('tq_check_tst_init');
            dispatch({
                type: ActionEnum.SET_IS_TESTER,
                payload: { isTester },
            })
        })();
    }, [dispatch])

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
                        dispatch({
                            type: ActionEnum.SET_IS_TESTER,
                            payload: { isTester: false },
                        })
                    } 
                    else {
                        dispatch({
                            type: ActionEnum.SET_IS_TESTER,
                            payload: { isTester: true },
                        })
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
