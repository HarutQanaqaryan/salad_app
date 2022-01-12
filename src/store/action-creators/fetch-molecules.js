import { fetchMoleculesType } from "../moleculesReducer";

export const fetchMolecules = () => {
  return async (dispatch) => {
    dispatch({ type: fetchMoleculesType.FETCH_MOLECULES });
    fetch("http://test-job.webatom.ru/molecules")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: fetchMoleculesType.FETCH_MOLECULES_SUCCES,
          payload: data.result.map((dataMolecules) => {
            return { dataMolecules, isAdded: false };
          })
        });
      })
      .catch((e) => {
        dispatch({
          type: fetchMoleculesType.FETCH_MOLECULES_ERROR,
        });
      });
  };
};