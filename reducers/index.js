
import { combineReducers } from "redux";
import authreducer from "./auth.reducer";
import userreducer from "./user.reducer";
import {reducer as formReducer} from "redux-form";

const reducers ={
    authreducer,
    userreducer,
    form:formReducer,
    whiteList:["authreducer","userreducer"]
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {

    if (action.type === "USER_LOGGED_OUT_SUCCESS") {
        state = {}
    }

    return appReducer(state, action);
}

export default rootReducer;