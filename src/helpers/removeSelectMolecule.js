import { addMoleculesType } from "../store/createUniqueSaladreducer";
import { fetchMoleculesType } from "../store/moleculesReducer";

export const removeSelectedMolecule = (
  parentElemId,
  dispatch,
  ingredients
) => {
  dispatch({
    type: addMoleculesType.REMOVE_SELECTED_MOLECULE,
    payload: ingredients.filter((el) => el.blockId !== parentElemId),
  });
  dispatch({
    type: fetchMoleculesType.SELECTED_MOLECULE,
    id: parentElemId,
    added: false,
  });
};
