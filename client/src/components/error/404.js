import React from 'react'
import logo from '../../assets/images/logo.png'
import './404.css'
export default function () {
	return (
		<div className="main valign-wrapper" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
			<div styleName="contenedor">
				<div>
					<img
						className="responsive-image"
						styleName="logoCloud"
						src={logo}
						alt="logo"
						draggable="false"
					/>
					<div styleName="insidetext">
						<h2>
							Ooops... Error <span styleName="err4s">4</span>
							<span style={{ color: '#00909E' }}>0</span>
							<span styleName="err4s">4</span>
						</h2>
						<span styleName="firstRowText">
							Lo sentimos. La p&aacute;gina que intentaste buscar no existe.
						</span>
						<span styleName="secondRowText">
							Por favor verifique la direcci&oacute;n introducida e intentelo de
							nuevo.
						</span>
						<br />
						<a href="/">
							<button href="/" className="btn" styleName="__btn-tq">
								Inicio
								<i
									className="material-icons right"
									style={{ marginLeft: '3px' }}
								>
									home
								</i>
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
