import React from 'react';
import LanguageSelector from '../components/LanguageSelector';
import SignUpPage from '../pages/SignUpPage'
import SignInPage from '../pages/SignInPage'
import HomePage from '../pages/HomePage'
import UserPage from '../pages/UserPage'
import ShiftPage from '../pages/ShiftPage'
import { HashRouter as Router,Route,Redirect,Switch} from 'react-router-dom'
import TopBar from '../components/TopBar';
import { useSelector } from 'react-redux'



const App = () => {

  const {isSignedIn } = useSelector((store) => ({isSignedIn:store.isSignedIn}));
  
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
          <Route path ="/myshifts/:username" component = {ShiftPage}/>
          <Route path = "/user/:username" component = {UserPage}/>
          
          <Redirect to="/" />
        </Switch>
      </Router>
      <LanguageSelector/> 
    </div>
  );
  
}

// const mapStateToProps = store => {
//   return {
//     isSignedIn: store.isSignedIn
//   }
// }


export default App;
