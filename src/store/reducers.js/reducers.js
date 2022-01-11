import { combineReducers } from "redux";
import { addSaladReducer } from "../addSaladReducer";
import { createUniqueSaladReducer } from "../createUniqueSaladreducer";
import { moleculesReducer } from "../moleculesreducer";
import { saladsReducer } from "../saladReducer";


export const rootReducer = combineReducers({
    salads: saladsReducer,
    mySalads: addSaladReducer,
    molecules: moleculesReducer,
    createUniqueSalad: createUniqueSaladReducer
})