export const addMoleculesType = {
  ADD_INGREDIENTS: "ADD_INGREDIENTS",
  ADD_PRICE: "ADD_PRICE",
  ADD_DECREASE_QTY: "ADD_DECREASE_QTY",
  SAVED_SALAD: "SAVED_SALAD",
  REMOVE_SELECTED_MOLECULE: "REMOVE_SELECTED_MOLECULE",
  UPDATE_INGREDIENTS_PRICE: "UPDATE_INGREDIENTS_PRICE",
};
const initialState = {
  ingredients: [],
  moleculesPrice: 0,
  saved: false,
};

export const createUniqueSaladReducer = (state = initialState, action) => {
  switch (action.type) {
    case addMoleculesType.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case addMoleculesType.ADD_PRICE:
      return { moleculesPrice: action.price };
    case addMoleculesType.ADD_DECREASE_QTY:
      return {
        ...state,
        ingredients: state.ingredients.map((molecule) =>
          molecule.blockId === action.id
            ? { ...molecule, qty: action.qty, price: action.qty }
            : molecule
        ),
      };
    case addMoleculesType.UPDATE_INGREDIENTS_PRICE:
      return {
        ...state,
        ingredients: state.ingredients.map((price) =>
          price.blockId === action.id
            ? { ...price, discount_price: action.price }
            : price
        ),
      };
    case addMoleculesType.REMOVE_SELECTED_MOLECULE:
      return { ingredients: action.payload };
    case addMoleculesType.SAVED_SALAD:
      return { saved: action.saved };
    default:
      return state;
  }
};
