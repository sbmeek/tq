import React, { useState, useEffect } from 'react'
import flecha from '../../assets/images/flecha-roja.png'
import menulog from '../../assets/images/menu-logo.png'
import FirstTimeModal from './FirstTimeModal'
import './Menu.css'

export default function Menu<T extends { isUserNew: boolean }>({
	isUserNew
}: T) {
	const [showMenu, setShowMenu] = useState(false)
	const [enoughSpace, setEnoughSpace] = useState(false)
	const [showNewUserModal, setShowNewUserModal] = useState(false)

    useEffect(() => {
        setShowNewUserModal(isUserNew);
    }, [isUserNew])

	useEffect(() => {
		handleSpace()
		window.addEventListener('resize', handleSpace)
		return () => window.removeEventListener('resize', handleSpace)
	}, [])

	const handleSpace = () => {
		setEnoughSpace(window.innerWidth > 1311)
	}

	const toggleMenuActivation = () => {
		if (showNewUserModal) setShowNewUserModal(false)
		setShowMenu(!showMenu)
	}

	return (
		<div
			styleName="container-menu"
			style={{
				paddingRight: `${showMenu ? '27px' : ''}`,
			}}
		>
			<div
				styleName={`overlay ${showMenu && !enoughSpace ? 'active' : ''}`}
                onClick={toggleMenuActivation}
                onTouchStartCapture={toggleMenuActivation}
			></div>
			<div>
				<button
					styleName={`btn-menu ${showMenu ? 'active' : ''}`}
					onClick={toggleMenuActivation}
				>
					<img src={flecha} alt="flecha roja" />
					<img src={menulog} alt="menu logo" />
				</button>
				<div styleName={`sidebar ${showMenu ? 'active' : ''}`}>
					<div>
						<div styleName="sidebar-title">
							<h1>Menu</h1>
						</div>
						<div styleName="btn-container">
							<button styleName="sidebar-button">
								<i>i</i>
								<span>Inicio</span>
							</button>
						</div>
						<div styleName="btn-container">
							<button styleName="sidebar-button">
								<i>i</i>
								<span>Bandeja</span>
							</button>
						</div>
						<div styleName="btn-container">
							<button styleName="sidebar-button">
								<i>i</i>
								<span>TQ</span>
							</button>
						</div>
						<div styleName="btn-container">
							<button styleName="sidebar-button">
								<i>i</i>
								<span>SB Meek</span>
							</button>
						</div>
						<div styleName="terms-container">
							<button styleName="btn-terms">Terminos y Condiciones</button>
						</div>
					</div>
				</div>
			</div>
			<FirstTimeModal active={showNewUserModal} />
		</div>
	)
}
