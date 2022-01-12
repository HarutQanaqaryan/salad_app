import { addMoleculesType } from "../store/createUniqueSaladreducer";

const checkAddDecreaseBtn = (e, item) => {
  if (e.target.id === "add") {
    return item + 1;
  }
  if (e.target.id === "decrease") {
    return item - 1;
  }
};

export const addDecreaseQty = (e, parentElemId, dispatch, ingredients) => {
  ingredients.forEach((item) => {
    if (parentElemId === item.blockId) {
      dispatch({
        type: addMoleculesType.ADD_DECREASE_QTY,
        id: parentElemId,
        qty: checkAddDecreaseBtn(e, item.qty),
      });
    }
  });
};
