import {AsyncStorage} from "react-native";
import {createStore,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reducers from '../reducers';
import {persistStore,persistReducer} from "redux-persist";

const persistConfig = {
    key:"root",
    storage:AsyncStorage,
    whiteList:["authreducer","userreducer"]
}

const persistedReducer= persistReducer(persistConfig,reducers);

export default ()=>{
    let store =  createStore(persistedReducer,{}, applyMiddleware(thunk));
    let persistor = persistStore(store);
    return {store,persistor}; 
}

