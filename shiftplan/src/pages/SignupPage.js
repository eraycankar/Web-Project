import React from 'react'
import {signup,changeLanguage} from '../api/apiCalls'
import Input from '../components/Input'
import {withTranslation} from 'react-i18next'
import '../css/signup.css';
import TR_Flag from '../TR_Flag.png'
import UK_Flag from '../UK_Flag.png'
import pic1 from '../1.png'


class SignupPage extends React.Component{
    state ={
        username : null,
        email : null,
        password : null,
        passwordRepeat : null,
        pendingApiCall : false,
        errors : {}
    };

    onChange = event => {

        const { t } = this.props; 
        const{ name,value } = event.target;
        // const value = event.target.value;
        // const name = event.target.name;

        const errors = { ...this.state.errors};
        errors[name] = undefined;

        if(name === 'password' || name ==='passwordRepeat'){
            if(name === 'password' && value !== this.state.passwordRepeat){
                errors.passwordRepeat = t('Password mismatch')
            }else if (name === 'passwordRepeat' && value !== this.state.password){
                errors.passwordRepeat = t('Password mismatch')
            }
            else {
                errors.passwordRepeat = undefined;
            }
        }

        this.setState({
            [name]: value,
            errors
        });
       
    }

    onClickSignUp = async event => {
        event.preventDefault();

        

        const{username,email,password,passwordRepeat} = this.state;
        
        this.setState( {pendingApiCall : true})

        const body = {
            username,
            email,
            password,
            passwordRepeat
        };
        try{
          const response = await signup(body);
        } catch(error){
            if(error.response.data.validationErrors){
                this.setState({ errors : error.response.data.validationErrors});
            }
        };

        this.setState({pendingApiCall: false});
        // signup(body)
        // .then((response) => {
        //     this.setState( {pendingApiCall : false})
        // }).catch(error => {
        //     this.setState( {pendingApiCall : false})
        // });
    };

    onChangeLanguage = language =>{
        const {i18n} = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }
  
    render(){

        const { pendingApiCall , errors} = this.state;
        const { username,email,password,passwordRepeat } = errors; 
        const {t} = this.props;
        

        return(
            <div className="container">
                <div className = "row justify-content-end">
                    <img src ={TR_Flag} alt ="Turkish Flag" onClick = {()=> this.onChangeLanguage('tr')} style={{cursor: 'pointer'}}></img>
                    <img src ={UK_Flag} alt ="UK Flag" onClick = {()=> this.onChangeLanguage('en')} style={{cursor: 'pointer'}} width ="32"height="21"></img>
                </div>
                <div className ="row content">
                    <div className =" col-md-6 mb-3">
                        <img src = {pic1} className="responsive" alt = "SignUp Page"/>
                    </div>
                        <div className ="col-md-6">
                        <h2 className="signin-text mb-3">{t("Sign Up")}</h2>
                            <form>
                                <div className = "form-group">
                                    <Input name="username" label = {t("Username")} error = {username} onChange = {this.onChange}/>  
                                    
                                    <Input name="email" label = {t("Email")} error = {email} onChange = {this.onChange} type = "email"/>
                                    
                                    <Input name="password" label ={t("Password")} error = {password} onChange = {this.onChange} type ="password"/>
                                    
                                    <Input name="passwordRepeat" label ={t("Password Repeat")} error = {passwordRepeat} onChange = {this.onChange} type ="password"/>
                                    
                                    <div className="text-center">
                                    <button className="btn btn-class" onClick={this.onClickSignUp}
                                    disabled={this.state.pendingApiCall || passwordRepeat !== undefined}>
                                        {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                                        {t("Sign Up")}
                                    </button>
                                    </div>
                                   
                                </div>
                            </form>
                        </div>
                    </div>
                    
            </div>
                
        );
    }

}
const SignupPageWithTranslation = withTranslation()(SignupPage);

export default SignupPageWithTranslation;
