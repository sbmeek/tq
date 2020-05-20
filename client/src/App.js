import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './assets/styles/App.css';

// Components
import Main from './components/main/Main-idx';
import Footer from './components/partial/Footer';
import Error404 from './components/error/404';
import Error500 from './components/error/500';
import Bandeja from './components/bandeja/Bandeja-idx';
import AuthRoute from './hocs/AuthRoute';
import UnauthRoute from './hocs/UnauthRoute';
import UserLink from './components/link/Link-idx';
import Msg from './components/sendMsg/Msg-idx';
import Loader from './components/partial/Loader';

// Context
import { InitContext, SET_IS_RENDERED } from './global/context/InitContext';

function App() {
  const { auth: { isStatus500, isLoaded } } = useSelector(store => store);
  const { state, dispatch } = useContext(InitContext);

  useEffect(() => {
    dispatch({
      type: SET_IS_RENDERED,
      payload: {
        isRendered: routeNeedsTime(window.location)
      }
    });
  }, [dispatch]);

  if(!isStatus500){
    if(!isLoaded){
      return <Loader />
    }
    else {
      return (
        <>
        { !state.isRendered && <Loader /> }
          <Router>
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
        </>
      );
    }
  }
  else
    return <Error500/>
}

function routeNeedsTime({ pathname }){
  switch(pathname){
    case '/':
      return false;
    default:
      return true;
  }
}

export default App;
