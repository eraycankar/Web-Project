import React from 'react'
import Input from '../components/Input'
import '../css/signup.css'
import pic1 from '../2.png'
import pic2 from '../3.jpg'


export default class SignInPage extends React.Component {

    state = {
        username : null,
        password : null
    }

    render() {
        return (
            
        <div className="responsive" style={{
            position:"fixed",
            backgroundImage: `url(${pic2})`,
            backgroundRepeat: "no-repeat",
            backgroundSize:"cover"
            
            
          }}>
            <div className = "container">
            
                <div className ="row content">
                    <div className = "col-md-6 mb-3">
                        <img src = {pic1} className="responsive" alt = "Login Page"/>
                    </div>
                    <div className = "col-md-6">
                        <h2 className ="signin-text mb-3">Sign In</h2>
                        <form style={{marginTop:'15%'}}>
                            <div className ="form-group">
                                <Input name = "username" label = "Username"/>
                                <Input name = "password" label ="Password" type ="password"/>

                                <div className="text-center">
                                    <button className="btn btn-class" style ={{marginTop: '10%'}}>
                                        Sign In
                                    </button>

                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
         </div>
            
        )
    }
}

