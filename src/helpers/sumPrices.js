import { addMoleculesType } from "../store/createUniqueSaladreducer"

export const sumPrices = (ingredients, dispatch) => {
        dispatch({type: addMoleculesType.ADD_PRICE, price: ingredients.map((el) => el.discount_price).reduce((acc, el) => acc + el, 0)})
}