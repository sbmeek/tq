import React, { useState } from 'react'
import flecha from '../../assets/images/flecha-roja.png'
import menulog from '../../assets/images/menu-logo.png'
import './Menu.css'

export default function Menu() {
	const [showMenu, setShowMenu] = useState(true);

	const toggleMenuActivation = () => {
		setShowMenu(!showMenu);
	}

	return (
		<div styleName="container-menu">
			{showMenu && <div styleName="overlay" onClick={toggleMenuActivation}></div>}
			<div>
				<button styleName={`btn-menu ${showMenu ? 'active' : ''}`} onClick={toggleMenuActivation}>
					<img src={flecha} alt="flecha roja" />
					<img src={menulog} alt="menu logo" />
				</button>
				<div styleName={`sidebar ${showMenu ? 'active' : ''}`}>
					<div>
						<div styleName="sidebar-title">
							<h1>Menu</h1>
						</div>
						<div styleName="sidebar-button-container"><button styleName="sidebar-button">pedrito</button></div>
						<div styleName="sidebar-button-container"><button styleName="sidebar-button">juanito</button></div>
						<div styleName="sidebar-button-container"><button styleName="sidebar-button">saldi</button></div>
						<div styleName="sidebar-button-container"><button styleName="sidebar-button">habladera</button></div>
						<div styleName="terminos-container">
							<button styleName="terminos">terminos y condiciones</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
