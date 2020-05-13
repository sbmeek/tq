import React, { useContext } from 'react';
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
import MensajeTQ from './components/MensajeTQ/mensaje-idx';
import {AuthContext} from './context/AuthContext';


function App() {
  const { isStatus500 } = useContext(AuthContext);
  if(!isStatus500){
    const endpoint = `http://localhost:4000`
    const socket = io(endpoint);
    return (
      <Router>
        <Switch>
          <UnauthRoute exact path="/" component={Main} redirectTo="/link" socket={socket}/>
          <AuthRoute path="/link" component={UserLink} redirectTo="/"/>
          <Route path="/mensaje" component={MensajeTQ} />
          <Route>
            <div className="main valign-wrapper" style={{ minHeight: '90vh' }}>
              <Error404/>
            </div>
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
