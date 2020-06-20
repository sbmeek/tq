import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';

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
import Loader from './components/partials/Loader';

function App() {
  const { auth: { isStatus500, isLoaded } } = useSelector(store => store);

  if(!isStatus500){
    if(!isLoaded){
      return <Loader />
    }
    else {
      return (
        <>
          <Router>
              <Switch>
                <UnauthRoute
                  needsRenderTime={false}
                  exact path="/" 
                  component={Main} 
                  redirectTo="/link"
                />
                <AuthRoute 
                  path="/messages" 
                  component={Bandeja} 
                  redirectTo="/"
                />
                <AuthRoute 
                  needsRenderTime={false} 
                  path="/link" 
                  component={UserLink} 
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
