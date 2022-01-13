export const checkQtyIngredients = (
  ingredients,
  molecules,
  dispatch,
  addMoleculesType
) => {
  ingredients.forEach((item) => {
    molecules.forEach(({ dataMolecules }) => {
      if (item.qty > dataMolecules.qty && item.blockId === dataMolecules._id) {
        dispatch({
          type: addMoleculesType.VALID_QTY,
          id: dataMolecules._id,
          qty: true,
        });
        alert("no")
      }
      if (item.qty <= dataMolecules.qty && item.blockId === dataMolecules._id) {
        dispatch({
          type: addMoleculesType.VALID_QTY,
          id: dataMolecules._id,
          qty: false,
        });
        alert("yes")
      }
    });
  });
};
