import React from 'react'
import './MsgSent.css';
import { Link } from 'react-router-dom';

export const MsgSent = () => {

  return (
      <div  style={{ display: 'flex', flexDirection:'column',alignItems: 'center'}}>
           <t styleName='send'> <span 
            style={{border: '#0aff0a', 
            borderStyle:'solid', 
            color: '#0aff0a',
            fontSize: '16px'
              }
                }  
            class="material-icons"> check</span>MENSAJE ENVIADO.</t>
          <button onClick={() => window.location.reload()} style={{background: 'none', margin:'3px' }}> <p>envia otro mensaje</p></button>
          <h3 styleName='h3'>¿Te gustaria recibir</h3>
          <h3 styleName='h3-2'> mensajes de tus amigos?</h3>
          <Link to= "/">
              <button
                styleName="_btn-tq"
                type= "button"
                >
                  Generar link
              </button>
      
        </Link>
      
          <p style={{
          color: 'white',
            marginTop: '25px',
            fontSize: '17px'
          
          }}>
          <span >Genera un link y compartelo en tus redes sociales,</span>
        </p>
        <p style={{color: 'white', fontSize: '15px'}}>
          <span>  y comienza a recibir mensajes de tus amigos.</span>
        </p>
              
          
      </div>
  )
}  

export default MsgSent;