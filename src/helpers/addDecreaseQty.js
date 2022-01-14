import { addMoleculesType } from "../store/createUniqueSaladReducer";

const checkAddDecreaseBtn = (e, item) => {
  if (e.target.id === "add") {
    return item + 1;
  }
  if (e.target.id === "decrease") {
    return item - 1;
  }
};

const checkUpdatePrice = (e, price, moleculePrice) => {
  if (e.target.id === "add") {
    return price + moleculePrice;
  }
  if (e.target.id === "decrease") {
    return price - moleculePrice;
  }
};

export const updatePrice = (
  e,
  parentElemId,
  dispatch,
  ingredients,
  molecules
) => {
  molecules.forEach((el) => {
    ingredients.forEach((item) => {
      if (parentElemId === item.blockId && item.blockId === el.dataMolecules._id) {
        dispatch({
          type: addMoleculesType.UPDATE_INGREDIENTS_PRICE,
          id: parentElemId,
          price: checkUpdatePrice(e, item.discount_price, el.dataMolecules.discount_price),
        });
      }
    });
  });
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
