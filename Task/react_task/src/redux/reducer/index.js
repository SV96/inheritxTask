import { combineReducers } from "redux";
import { setUserInfoActionType } from "../actionTypes";

const initialState = {
    "firstName": "",
    "lastName": "",
    "mobileNumber":"",
    "email": "",
    "password": ""
}

const userReducer = (state=initialState,action)=>{
    switch(action.type){
        case setUserInfoActionType:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state    
    }
};

const rootReducer = combineReducers({
    user: userReducer
  });

export default rootReducer;
