import React from 'react'
import {login} from '../api/apiCalls'
import {withTranslation} from 'react-i18next'
import Input from '../components/Input'
import '../css/signin.css'
import pic1 from '../2.png'
import pic2 from '../3.jpg'
import ButtonWithProgress from '../components/ButtonWithProgress'
import { withApiProgress } from '../shared/ApiProgress'
// import {Authentication} from '../shared/AuthenticationContext'


class SignInPage extends React.Component {
    // static contextType = Authentication;

    state = {
        username : null,
        password : null,
        error: null,
        pendingApiCall: null
    }

   
    
    onChange = event =>{
        const {name , value} = event.target;
        this.setState({
            [name]: value,
            error: null
        })
    };

    onClickLogin = async  event => {
        event.preventDefault();
        const {username,password} = this.state;
        const creds = {
            username ,
            password 
        };
        const onSignInSuccess = () => {};
        const { push } = this.props.history;
        this.setState({
            error: null
        });
        try{
            const response = await login(creds)
            push('/');
            

            const authState = {
                ///...response.data,
                username: username,
                password: password,
                displayName: response.data.username,
                image: response.data.image,
            }

            onSignInSuccess(authState);
        } catch(apiError){
            this.setState({
                error:apiError.response.data.message
            })
        }
       

    }

    render() {
        
        const { t, pendingApiCall } = this.props;
        const {username,password,error} = this.state;

        const buttonEnabled = username && password;

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
                        <h2 className ="signin-text mb-3">{t('Sign In')}</h2>
                        <form style={{marginTop:'10%'}}>
                            <div className ="form-group">
                                <Input name = "username"  label = {t("Username")}  onChange={this.onChange}/>
                                <Input name = "password" label = {t("Password")} type ="password" onChange={this.onChange}/>
                                {error && <div className="alert validation-alert" role="alert" >
                                    {t("Unauthorized")}
                                </div>}

                                <div className="text-center">

                                    <ButtonWithProgress  disabled={!buttonEnabled || pendingApiCall}  onClick= {this.onClickLogin} pendingApiCall= {pendingApiCall} text= {t("Sign In")} />
                                    

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
const SignInPageWithTranslation = withTranslation()(SignInPage);

export default withApiProgress(SignInPageWithTranslation,'/api/1.0/auth');

