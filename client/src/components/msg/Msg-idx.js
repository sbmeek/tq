import React, { useEffect, useState } from "react";
import Error404 from '../error/404';

export default function ({ match: { params }, ...rest }) {
  params.username = params.username.toLowerCase();
  const [socket, setSocket] = useState(null);
  const [userExists, setUserExists] = useState(true);

  useEffect(() => {
    (async () => {
      await setSocket(rest.socket);
      if (socket !== null) {
        socket.emit('tq:exists', { username: params.username });
        socket.on('tq:exists', (data) => {
          if (data === null) {
            setUserExists(false);
          }
        });
      }
    })();
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

  useEffect(() => {
    if(socket !== null){
      socket.on('msg:send', data => {
        console.log(data);
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
            <input 
              type="text" 
              name="msg" 
              value={msg}
              id="msg"
              placeholder="msg"
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
