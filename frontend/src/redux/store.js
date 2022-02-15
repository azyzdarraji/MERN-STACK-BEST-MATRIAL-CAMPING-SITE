import { createStore, applyMiddleware , compose ,combineReducers } from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension"


const reducer=combineReducers({
     
})

let initialState={}

const middlware=[thunk]

const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middlware)))



export default store