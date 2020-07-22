import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';

// Components
import Main from './components/main/Main-idx';
import Footer from './components/partials/Footer';
import Error404 from './components/error/404';
import Error500 from './components/error/500';
import Inbx from './components/inb/Inb-idx';
import AuthRoute from './HOCs/AuthRoute';
import UnauthRoute from './HOCs/UnauthRoute';
import UserLink from './components/link/Link-idx';
import TemplateMSG from './components/inb/Template';
import Msg from './components/sendMsg/Msg-idx';
import Loader from './components/partials/Loader';
import { useEffect } from 'react';
import { useContext } from 'react';
import { InitContext } from './global/context/InitContext';

function App() {
  const { isStatus500, isLoaded, user } = useSelector(store => store.auth);
  const { state: { socket } } = useContext(InitContext);

  useEffect(() => {
    if(user !== null){
      socket.emit('tq:init-user', { username: user.username });
    }
  }, [user, socket])

  const toggleRootScroll = () => {
    document.querySelector('#react-root').classList.toggle('d-scroll');
  }

  if(!isStatus500){
    if(!isLoaded){
      toggleRootScroll();
      return <Loader />
    }
    else {
      toggleRootScroll();
      return (
        <>
          <Router>
              <Switch>
                <UnauthRoute
                  needsRenderTime={window.navigator.onLine}
                  exact path="/" 
                  component={Main} 
                  redirectTo="/link"
                />
                <AuthRoute 
                  path="/messages" 
                  component={Inbx} 
                  redirectTo="/"
                />
                <AuthRoute 
                  needsRenderTime={true} 
                  path="/link" 
                  component={UserLink} 
                  redirectTo="/"
                />
                <AuthRoute 
                  needsRenderTime={false} 
                  path="/message" 
                  component={TemplateMSG} 
                  redirectTo="/"
                />
                <Route exact path="/:username" component={Msg} />
                <Route path="*">
                  <Error404/>
                </Route>
              </Switch>
              <Route path="/" component={Footer}/>
          </Router>
        </>
      );
    }
  }
  else
    return <Error500/>
}

export default App;
