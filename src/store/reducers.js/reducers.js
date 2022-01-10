import { combineReducers } from "redux";
import { addSaladReducer } from "../addSaladReducer";
import { saladsReducer } from "../saladReducer";


export const rootReducer = combineReducers({
    salads: saladsReducer,
    mySalads: addSaladReducer
})