export const addMoleculesType = {
  ADD_INGREDIENTS: "ADD_INGREDIENTS",
  ADD_PRICE: "ADD_PRICE",
  ADD_DECREASE_QTY: "ADD_DECREASE_QTY",
  SAVED_SALAD: "SAVED_SALAD",
};
const initialState = {
  ingredients: [],
  price: 0,
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
    case addMoleculesType.ADD_DECREASE_QTY:
      return {
        ...state,
        ingredients: state.ingredients.map((molecule) =>
          molecule.blockId === action.id
            ? { ...molecule, qty: action.qty }
            : molecule
        ),
      };
    case addMoleculesType.SAVED_SALAD:
      return { saved: true };
    default:
      return state;
  }
};
