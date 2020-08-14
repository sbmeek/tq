import React from 'react'
import './MsgSent.css'
import { Link } from 'react-router-dom'
import logo2 from '../../assets/images/msg/logo2.png'

export const MsgSent = () => {
	return (
		<div
			style={{
				minHeight: '89.9vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				background: '#ffffff91',
			}}
		>
			<div
				styleName="container"
					
			>
				<img
					src={logo2}
					alt="logo2"
					style={{ width: '300px', height: '200px', marginTop: '-146px' }}
				></img>
				<div styleName="perfil"></div>
				<div
					style={{
						display: 'flex',
						textAlign: 'center',
						flexDirection: 'column',
					}}
				>
					<h3 styleName="H3">Gracias por mandar</h3>
					<h3 styleName="H3-2">tu mensaje.</h3>
					<button
						onClick={() => window.location.reload()}
						style={{ background: 'none', margin: '3px' }}
					>
						{' '}
						<p>envia otro mensaje</p>
					</button>
				</div>
			</div>
			<Link to="/">
				<button styleName="_btn-tq" type="button">
					Inicio
				</button>
			</Link>
		</div>
	)
}

export default MsgSent
