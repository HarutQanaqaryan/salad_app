export const ADDED_UNIQUE_SALAD_STORAGE = "ADDED_UNIQUE_SALAD_STORAGE";

export const addUniqueSaladType = {
  ADD_UNIQUE_SALAD: "ADD_UNIQUE_SALAD",
  REMOVE_UNIQUE_SALAD: "REMOVE_UNIQUE_SALAD",
};
const initialState = {
  addedUniqueSalad:
    JSON.parse(localStorage.getItem(ADDED_UNIQUE_SALAD_STORAGE)) || [],
};

export const addUniqueSaladReducer = (state = initialState, action) => {
  switch (action.type) {
    case addUniqueSaladType.ADD_UNIQUE_SALAD:
      return {
        ...state,
        addedUniqueSalad: [...state.addedUniqueSalad, action.addUniqueSalad],
      };
    case addUniqueSaladType.REMOVE_UNIQUE_SALAD:
      return { ...state, addedUniqueSalad: action.removeUniqueSalad };
    default:
      return state;
  }
};
