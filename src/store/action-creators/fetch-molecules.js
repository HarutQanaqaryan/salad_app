import { GET_MOLECULES } from "../../API";
import { fetchMoleculesType, MOLECULES_STORAGE } from "../moleculesreducer";

export const fetchMolecules = () => {
  return async (dispatch) => {
    dispatch({ type: fetchMoleculesType.FETCH_MOLECULES });
    fetch(GET_MOLECULES)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: fetchMoleculesType.FETCH_MOLECULES_SUCCES,
          payload: data.result.map((dataMolecules) => {
            return { dataMolecules, isAdded: false };
          }),
        });
        localStorage.setItem(
          MOLECULES_STORAGE,
          JSON.stringify(
            data.result.map((dataMolecules) => {
              return { dataMolecules, isAdded: false };
            })
          )
        );
      })
      .catch((e) => {
        dispatch({
          type: fetchMoleculesType.FETCH_MOLECULES_ERROR,
        });
      });
  };
};
