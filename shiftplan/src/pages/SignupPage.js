import React,{useState} from "react";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import "../css/signup.css";
import pic1 from "../1.png";
import pic2 from "../3.jpg";
import ButtonWithProgress from '../components/ButtonWithProgress'
import { useApiProgress } from "../shared/ApiProgress";
import { useDispatch } from 'react-redux'
import { signupHandler } from '../redux/authAction'

const SignupPage = props => {

  const [form,setForm] = useState({
    username: null,
    email: null,
    password: null,
    passwordRepeat: null
  })

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const onChange = (event) => {
    
    const { name, value } = event.target;
    setErrors((previousErrors) => ({...previousErrors, [name]: undefined}));
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  }
  const onClickSignUp = async (event) => {
    event.preventDefault();

    const  { history } = props;
    const { push } = history;

    const { username, email, password, passwordRepeat } = form;

  
    const body = {
      username,
      email,
      password,
      passwordRepeat,
    };
    try {
      await dispatch(signupHandler(body));
      push('/');
     
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors);
      }
    }
  };

  
   
    const { username:usernameError, email:emailError, password:passwordError } = errors;
    const  pendingApiCallSignup  = useApiProgress('post','/api/1.0/users');
    const  pendingApiCallSignin  = useApiProgress('post','/api/1.0/auth');

    const pendingApiCall = pendingApiCallSignup || pendingApiCallSignin;

    const { t } = useTranslation();

    let passwordRepeatError;
    if(form.password !== form.passwordRepeat){
      passwordRepeatError = t('Password mismatch');
    }
    return (
      <div
        className="responsive"
        style={{
          position: "fixed",
          backgroundImage: `url(${pic2})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="row justify-content-end"></div>
          <div className="row content">
            <div className=" col-md-6 mb-3">
              <img src={pic1} className="responsive" alt="SignUp Page" />
            </div>
            <div className="col-md-6">
              <h2 className="signin-text mb-3"style={{marginTop:'5%'}}>{t("Sign Up")}</h2>
              <form>
                <div className="form-group">
                  <Input
                    name="username"
                    label={t("Username")}
                    error={usernameError}
                    onChange={onChange}
                  />

                  <Input
                    name="email"
                    label={t("Email")}
                    error={emailError}
                    onChange={onChange}
                    type="email"
                  />

                  <Input
                    name="password"
                    label={t("Password")}
                    error={passwordError}
                    onChange={onChange}
                    type="password"
                  />

                  <Input
                    name="passwordRepeat"
                    label={t("Password Repeat")}
                    error={passwordRepeatError}
                    onChange={onChange}
                    type="password"
                  />

                  <div className="text-center">
                    <ButtonWithProgress
                      onClick={onClickSignUp}
                      disabled={
                        pendingApiCall ||
                        passwordRepeatError !== undefined
                      }
                      pendingApiCall = {pendingApiCall}
                      text = {t("Sign Up")}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}



export default SignupPage;
