import { combineReducers } from "redux";
import { addSaladReducer } from "../addSaladReducer";
import { addUniqueSaladReducer } from "../addUniqueSalad";
import { createUniqueSaladReducer } from "../createUniqueSaladReducer";
import { moleculesReducer } from "../moleculesReducer";
import { saladsReducer } from "../saladReducer";


export const rootReducer = combineReducers({
    salads: saladsReducer,
    mySalads: addSaladReducer,
    molecules: moleculesReducer,
    createUniqueSalad: createUniqueSaladReducer,
    addUniqueSalad: addUniqueSaladReducer
})