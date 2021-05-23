import * as ACTIONS from './Constants'
import { login , signup} from '../api/apiCalls'

export const signoutSuccess = () => {
    return {
        type: ACTIONS.SIGNOUT_SUCCESS
    };
}

export const signinSuccess = authState => {
    return {
        type: ACTIONS.SIGNIN_SUCCESS,
        payload: authState
    }
};

export const updateSuccess = ({username, image}) => {
    return {
       type:ACTIONS.UPDATE_SUCCESS,
       payload: {
           username,
           image
       }
    };
};

export const loginHandler = (credentials)=> {
    return async function(dispatch){

    const response = await login(credentials)
    const authState = {
        ...response.data,
        password: credentials.password,
     }

    //onSignInSuccess(authState);
   
    dispatch(signinSuccess(authState));
    return response;
    }
    
}

export const signupHandler = (user) => {
    return async function (dispatch){
        const response = await signup(user);
        await dispatch(loginHandler(user))
        return response;
    }
}

 