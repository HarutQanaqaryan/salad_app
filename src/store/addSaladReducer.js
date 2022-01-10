export const addSaladType = {
  ADD_SALAD: "ADD_SALAD",
  REMOVE_SALAD: "REMOVE_SALAD",
};
const initialState = {
  addSalad: [],
  addBtnLabel: "Добавить в мои салаты",
};

export const addSaladReducer = (state = initialState, action) => {
  switch (action.type) {
    case addSaladType.ADD_SALAD:
      return state.addSalad.length === 0
        ? { addSalad: [action.payload], addBtnLabel: "Удалить" }
        : {
            ...state,
            addSalad: [...state.addSalad, action.payload],
            addBtnLabel: "Удалить",
          };
    case addSaladType.REMOVE_SALAD:
      return { addSalad: action.payload, addBtnLabel: "Добавить в мои салаты" };
    default:
      return state;
  }
};
