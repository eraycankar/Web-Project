import React from 'react';
import LanguageSelector from '../components/LanguageSelector';
import SignUpPage from '../pages/SignUpPage'
import SignInPage from '../pages/SignInPage'
import HomePage from '../pages/HomePage'
import UserPage from '../pages/UserPage'
import { HashRouter as Router,Route,Redirect,Switch} from 'react-router-dom'
import { login } from '../api/apiCalls';
import TopBar from '../components/TopBar';
// import {Authentication} from '../shared/AuthenticationContext'


class App extends React.Component {

  // static contextType = Authentication;
  
  render(){
    const isSignedIn = false;

    return (
    <div>
      <Router>
        <TopBar/>
        <Switch>
          <Route exact path ="/" component = {HomePage}/> 
          {!isSignedIn && (<Route path = "/signin" component ={SignInPage}/>
          )}
          {!isSignedIn &&(
          <Route path = "/signup" component ={SignUpPage}/>
          )}
          <Route path = "/user/:username" component = {UserPage}/>
          <Redirect to="/" />
        </Switch>
      </Router>
      <LanguageSelector/> 
    </div>
  );
  }
}

export default App;
