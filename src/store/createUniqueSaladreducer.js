export const INGREDIENTS_STORAGE = "INGREDIENTS_STORAGE";

export const addMoleculesType = {
  ADD_INGREDIENTS: "ADD_INGREDIENTS",
  ADD_PRICE: "ADD_PRICE",
  ADD_DECREASE_QTY: "ADD_DECREASE_QTY",
  SAVED_SALAD: "SAVED_SALAD",
  REMOVE_SELECTED_MOLECULE: "REMOVE_SELECTED_MOLECULE",
  UPDATE_INGREDIENTS_PRICE: "UPDATE_INGREDIENTS_PRICE",
  VALID_QTY: "VALID_QTY",
  ADD_NAME: "ADD_NAME",
  REMOVE_INGREDIENTS: "REMOVE_INGREDIENTS"
};
export const initialState = {
  uniqueSaladName: "",
  ingredients: JSON.parse(localStorage.getItem(INGREDIENTS_STORAGE)) || [],
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
      case addMoleculesType.REMOVE_INGREDIENTS:
        return {
          ...state, ingredients: []
        }
    case addMoleculesType.ADD_PRICE:
      return { ...state, moleculesPrice: action.price };
    case addMoleculesType.ADD_DECREASE_QTY:
      return {
        ...state,
        ingredients: state.ingredients.map((molecule) =>
          molecule.blockId === action.id
            ? { ...molecule, qty: action.qty }
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
    case addMoleculesType.VALID_QTY:
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) =>
          ingredient.blockId === action.id
            ? { ...ingredient, isValidQty: action.qty }
            : ingredient
        ),
      };
    case addMoleculesType.ADD_NAME:
      return { ...state, uniqueSaladName: action.name };
    case addMoleculesType.REMOVE_SELECTED_MOLECULE:
      return { ...state, ingredients: action.payload };
    case addMoleculesType.SAVED_SALAD:
      return { ...state, saved: action.saved };
    default:
      return state;
  }
};
