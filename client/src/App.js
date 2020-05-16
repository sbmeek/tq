import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/styles/App.css';

// Components
import Main from './components/main/Main-idx';
import Footer from './components/partials/Footer';
import Error404 from './components/error/404';
import Error500 from './components/error/500';
import Bandeja from './components/bandeja/Bandeja-idx';
import AuthRoute from './HOCs/AuthRoute';
import UnauthRoute from './HOCs/UnauthRoute';
import UserLink from './components/link/Link-idx';
import Msg from './components/sendMsg/Msg-idx';

// Context
import {AuthContext} from './context/AuthContext';
import { useRef } from 'react';
//

function App() {
  const { isStatus500, isRendered, setIsRendered } = useContext(AuthContext);
  const wait = useRef(null);
  useEffect(() => {
    setTimeout(() => {
        setIsRendered(true);
    }, 500);
  }, [setIsRendered])

  const dots = () => {
    window.setInterval(function() {
        if(wait.current !== null){
            let {current} = wait;
            if (current.innerHTML.length >= 3) 
                current.innerHTML = "";
            else 
                current.innerHTML += ".";
        }
    }, 100);
  }

  useEffect(() => {
    dots()
  }, [wait]);

  if(!isStatus500){
      return (
      <Router>
        {
          !isRendered && <div 
          style={{
              fontSize: '150px',
              opacity: '1',
              position: 'fixed',
              backgroundColor: '#FFF',
              zIndex: "24",
              width: '100%',
              minWidth: '110vh',
              minHeight: '110vh'
          }}
          className="valign-wrapper"
          >
              <div 
                  className="center-align"
                  style={{width: '100%'}}
              >
                  <h1 style={{color: '#000'}}>Cargando<span ref={wait}>...</span></h1>
              </div>
          </div>
      }
        <Switch>
          <UnauthRoute exact path="/" component={Main} redirectTo="/link"/>
          <AuthRoute path="/messages" component={Bandeja} redirectTo="/"/>
          <AuthRoute path="/link" component={UserLink} redirectTo="/"/>
          <Route exact path="/:username" component={Msg} />
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
