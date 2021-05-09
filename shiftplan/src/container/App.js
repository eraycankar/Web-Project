import React from 'react';
import LanguageSelector from '../components/LanguageSelector';
import SignUpPage from '../pages/SignUpPage'
import SignInPage from '../pages/SignInPage'
import HomePage from '../pages/HomePage'
import UserPage from '../pages/UserPage'

function App() {
  return (
    <div>
      <UserPage/>
      <LanguageSelector/>
    </div>
  );
}

export default App;
