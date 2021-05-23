import * as ACTIONS from './Constants'

const defaultState = {
    isSignedIn: false,
    username: undefined,
    image: undefined,
    password: undefined
};

const authReducer = (state ={...defaultState},action) => {
    if(action.type === ACTIONS.SIGNOUT_SUCCESS){
        return defaultState;
    } else if (action.type === ACTIONS.SIGNIN_SUCCESS){
        return {
            ...action.payload,
            isSignedIn:true
        }
    } else if(action.type === ACTIONS.UPDATE_SUCCESS){
        return {
            ...state,
            ...action.payload
        //     username: action.payload.username,
        //     image: action.payload.image
        }
    }
    return state;
};

export default authReducer;