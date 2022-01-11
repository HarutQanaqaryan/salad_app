export const ADDED_SALAD_STORAGE = "ADDED_SALAD_STORAGE";

export const addSaladType = {
  ADD_SALAD: "ADD_SALAD",
  REMOVE_SALAD: "REMOVE_SALAD",
};
const initialState = {
  addedSalads: JSON.parse(localStorage.getItem(ADDED_SALAD_STORAGE)) || []
};

export const addSaladReducer = (state = initialState, action) => {
  switch (action.type) {
    case addSaladType.ADD_SALAD:
      return {
        addedSalads: [...state.addedSalads, action.payload],
      };
    case addSaladType.REMOVE_SALAD:
      return { addedSalads: action.payload};
    default:
      return state;
  }
};
