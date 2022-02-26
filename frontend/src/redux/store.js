import { createStore, applyMiddleware , compose ,combineReducers } from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension"
import { productsReducer , productDetailsReducer } from './reducers/productReducers';
import { userReducer ,profileReducer, forgotPasswordReducer} from './reducers/userReducer';


const reducer=combineReducers({
     products:productsReducer,
     productDetails:productDetailsReducer,
     user:userReducer,
     profile:profileReducer,
     forgotPassword:forgotPasswordReducer,

})

let initialState={}

const middlware=[thunk]

const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middlware)))



export default store