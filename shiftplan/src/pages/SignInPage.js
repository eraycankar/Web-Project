import React,{useState,useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import Input from '../components/Input'
import '../css/signin.css'
import pic1 from '../2.png'
import pic2 from '../3.jpg'
import ButtonWithProgress from '../components/ButtonWithProgress'
import { useApiProgress } from '../shared/ApiProgress'
import { useDispatch } from "react-redux"
import { loginHandler } from '../redux/authAction'

// import {Authentication} from '../shared/AuthenticationContext'


const SignInPage = props =>{
    // static contextType = Authentication;

    const [username, setUsername] = useState();
    const [password,setPassword] = useState();
    const [error , setError] = useState();
    
    const  dispatch = useDispatch();

    useEffect(() => {
        setError(undefined)
    }, [username,password])


    const onClickSignin = async  event => {
        event.preventDefault();
        
        const creds = {
            username ,
            password 
        };
        const { history } = props;
        const { push } = history;
        // this.setState({
        //     error: null
        // });

        setError(undefined);
        try{
            await dispatch(loginHandler(creds))
            console.log(creds.role);
            push('/');

        } catch(apiError){
            setError(apiError.response.data.message);
            // this.setState({
            //     error:apiError.response.data.message
            // })
        }
       

    }

    
        const { t } = useTranslation();
        const  pendingApiCall  = useApiProgress('post','/api/1.0/auth');

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
                                <Input name = "username"  label = {t("Username")}  onChange={(event) => setUsername(event.target.value)}/>
                                <Input name = "password" label = {t("Password")} type ="password" onChange={(event) => setPassword(event.target.value)}/>
                                {error && <div className="alert validation-alert" role="alert" >
                                    {t("Unauthorized")}
                                </div>}

                                <div className="text-center">

                                    <ButtonWithProgress  disabled={!buttonEnabled || pendingApiCall}  onClick= {onClickSignin} pendingApiCall= {pendingApiCall} text= {t("Sign In")} />
                                    

                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
         </div>
            
        )
    
}


export default SignInPage;


