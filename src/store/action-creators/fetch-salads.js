import { DATA_SALAD_STORAGE, fetchSaladsType } from "../saladReducer";

export const fetchSalads = () => {
  return async (dispatch) => {
    dispatch({ type: fetchSaladsType.FETCH_SALADS });
    fetch("http://test-job.webatom.ru/salads")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: fetchSaladsType.FETCH_SALADS_SUCCES,
          payload: data.result.map((dataSalad) => {
            return { dataSalad, isAdded: false };
          }),
        });
        localStorage.setItem(
          DATA_SALAD_STORAGE,
          JSON.stringify(
            data.result.map((dataSalad) => {
              return { dataSalad, isAdded: false };
            })
          )
        );
      })
      .catch((e) => {
        dispatch({
          type: fetchSaladsType.FETCH_SALADS_ERROR,
        });
      });
  };
};
