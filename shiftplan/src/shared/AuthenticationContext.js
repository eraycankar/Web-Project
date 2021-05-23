import React, { Component } from 'react'

export const Authentication = React.createContext();

class AuthenticationContext extends Component {

    state = {
        isSignedIn : true,
        username : 'Salimalitiko',
        displayName: undefined,
        image: undefined,
        password: undefined
      }
    
      onSignInSuccess = authState => {
        this.setState({
          ...authState , 
        //   username : authState.username,
        //   displayName : authState.displayName,
        //   password : authState.password,
        //   image : authState.image,
          isSignedIn:true
        })
      }
    
      onSignOutSuccess = () => {
        this.setState({
          isSignedIn:false,
          username:undefined
        })
      }

    render() {
        return (
           <Authentication.Provider value = {{
               state : {...this.state },
               onSignInSuccess : this.onSignInSuccess,
               onSignOutSuccess : this.onSignOutSuccess 
            } }>
               {this.props.children}
           </Authentication.Provider>
        )
    }
}

export default AuthenticationContext;
