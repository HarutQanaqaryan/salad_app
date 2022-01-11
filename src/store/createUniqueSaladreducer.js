export const addMoleculesType = {
  ADD_INGREDIENTS: "ADD_INGREDIENTS",
  ADD_PRICE: "ADD_PRICE",
  ADD_QTY: "ADD_QTY",
  DECREASE_QTY: "DECREASE_QTY",
  SAVED_SALAD: "SAVED_SALAD",
};
const initialState = {
  ingredients: [],
  price: 0,
  qty: 0,
  saved: false,
};

export const createUniqueSaladReducer = (state = initialState, action) => {
  switch (action.type) {
    case addMoleculesType.ADD_INGREDIENTS:
      return {
        ingredients: [...state.ingredients, action.payload],
      };
    case addMoleculesType.ADD_PRICE:
      return (state.price = action.payload);
    case addMoleculesType.ADD_QTY:
      return { price: (state.price += 1) };
    case addMoleculesType.DECREASE_QTY:
      return { price: (state.price -= 1) };
    case addMoleculesType.SAVED_SALAD:
      return { saved: true };
    default:
      return state;
  }
};
