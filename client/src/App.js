import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';

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

function App() {
  const { isStatus500 } = useContext(AuthContext);

  if(!isStatus500){
    return (
      <Router>
        <Switch>
          <UnauthRoute exact path="/" component={Main} redirectTo="/link"/>
          <AuthRoute path="/bandeja" component={Bandeja} redirectTo="/"/>
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
