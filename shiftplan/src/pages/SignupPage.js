import React from "react";
import { signup } from "../api/apiCalls";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import "../css/signup.css";
import pic1 from "../1.png";
import pic2 from "../3.jpg";
import ButtonWithProgress from '../components/ButtonWithProgress'
import { withApiProgress } from "../shared/ApiProgress";

class SignupPage extends React.Component {
  state = {
    username: null,
    email: null,
    password: null,
    passwordRepeat: null,
    errors: {},
  };

  onChange = (event) => {
    const { t } = this.props;
    const { name, value } = event.target;
    // const value = event.target.value;
    // const name = event.target.name;

    const errors = { ...this.state.errors };
    errors[name] = undefined;

    if (name === "password" || name === "passwordRepeat") {
      if (name === "password" && value !== this.state.passwordRepeat) {
        errors.passwordRepeat = t("Password mismatch");
      } else if (name === "passwordRepeat" && value !== this.state.password) {
        errors.passwordRepeat = t("Password mismatch");
      } else {
        errors.passwordRepeat = undefined;
      }
    }

    this.setState({
      [name]: value,
      errors,
    });
  };

  onClickSignUp = async (event) => {
    event.preventDefault();

    const { username, email, password, passwordRepeat } = this.state;

   

    const body = {
      username,
      email,
      password,
      passwordRepeat,
    };
    try {
      const response = await signup(body);
    } catch (error) {
      if (error.response.data.validationErrors) {
        this.setState({ errors: error.response.data.validationErrors });
      }
    }

    // signup(body)
    // .then((response) => {
    //     this.setState( {pendingApiCall : false})
    // }).catch(error => {
    //     this.setState( {pendingApiCall : false})
    // });
  };

  render() {
    const {  errors } = this.state;
    const { username, email, password, passwordRepeat } = errors;
    const { t , pendingApiCall} = this.props;

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
                    error={username}
                    onChange={this.onChange}
                  />

                  <Input
                    name="email"
                    label={t("Email")}
                    error={email}
                    onChange={this.onChange}
                    type="email"
                  />

                  <Input
                    name="password"
                    label={t("Password")}
                    error={password}
                    onChange={this.onChange}
                    type="password"
                  />

                  <Input
                    name="passwordRepeat"
                    label={t("Password Repeat")}
                    error={passwordRepeat}
                    onChange={this.onChange}
                    type="password"
                  />

                  <div className="text-center">
                    <ButtonWithProgress
                      onClick={this.onClickSignUp}
                      disabled={
                        this.state.pendingApiCall ||
                        passwordRepeat !== undefined
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
}

const SignUpPageWithApiProgress = withApiProgress(SignupPage,'/api/1.0/users');
const SignupPageWithTranslation = withTranslation()(SignUpPageWithApiProgress);

export default SignupPageWithTranslation;
