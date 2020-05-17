import React, { useEffect, useState, useContext } from "react";
import Error404 from '../error/404';
import { InitContext } from '../../global/context/InitContext';

export default function ({ match: { params }, ...rest }) {
  params.username = params.username.toLowerCase();
  const { socket } = useContext(InitContext);
  const [userExists, setUserExists] = useState(true);

  useEffect(() => {
    socket.emit('tq:exists', { username: params.username });
    socket.on('tq:exists', (data) => {
      if (data === null) {
        setUserExists(false);
      }
      if(null !== data && data.expired){
        setUserExists(false);
      }
    });
  }, [socket, rest.socket, params.username]);

  return (
    <>
      {
        !userExists ?
          <Error404 /> :
          <Success
            username={params.username}
            socket={socket}
          />
      }
    </>
  );
}

function Success({ username, socket }) {
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if(socket !== null){
      socket.on('msg:send', data => {
        if(data.sent){
          setSent(true);
          setMsg('');
        }
      });
    }
  }, [socket]);

  const handleInputChange = async (e) => {
    const { value } = e.target;
    if(' ' === value)
      return 0;
    else
      await setMsg(value);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = { username, msg }
    socket.emit('msg:send', data);
  }

  return (
    <div className="valign-wrapper" style={{ minHeight: '90vh' }}>
      <div className="row" style={{ width: '100%' }}>
        <form onSubmit={handleFormSubmit}>
          <div 
            className="col s12 offset-s3"
            style={{width: '50%', background: 'white'}}
          >
            {
              sent ? 'Mensaje env\xEDado' : ''
            }
            <input 
              type="text" 
              name="msg" 
              value={msg}
              id="msg"
              placeholder="DIGITA TU MENSAJE"
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
