import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';
import './styles/App.css';

// Components
import Main from './components/main/Main-idx';
import Footer from './components/partials/Footer';
import Error404 from './components/error/404';
import Error500 from './components/error/500';
import AuthRoute from './HOCs/AuthRoute';
import UnauthRoute from './HOCs/UnauthRoute';
import UserLink from './components/link/Link-idx';
import Msg from './components/msg/Msg-idx';
import {AuthContext} from './context/AuthContext';


function App() {
  const { isStatus500 } = useContext(AuthContext);
  const endpoint = `http://localhost:4000`
  const [socket, setSocket] = useState(null);
  
  useEffect(() => {
    try {
      setSocket(io(endpoint));
    } catch (error) {
      console.error(error);
    }
  }, [endpoint]);

  if(!isStatus500){
    return (
      <Router>
        <Switch>
          <UnauthRoute exact path="/" component={Main} redirectTo="/link" socket={socket}/>
          <AuthRoute path="/link" component={UserLink} redirectTo="/"/>
          <Route exact path="/:username" children={(props) => 
              <Msg socket={socket} {...props} />
            } 
          >
          </Route>
          <Route path="*">
            <Error404/>
          </Route>
        </Switch>
        <Route path="/" component={Footer}/>
      </Router>
    );
  }
  else
    return <Error500/>
}

export default App;
