import { fetchSaladsType } from "../saladReducer";

export const fetchSalads = () => {
  return async (dispatch) => {
    dispatch({ type: fetchSaladsType.FETCH_SALADS });
    fetch("http://test-job.webatom.ru/salads")
      .then((res) => res.json())
      .then((data) => dispatch({ type: fetchSaladsType.FETCH_SALADS_SUCCES, payload: data.result }))
      .catch((e) => {
        dispatch({
          type: fetchSaladsType.FETCH_SALADS_ERROR,
          payload: "При загрузке произошла ошибка",
        });
      });
  };
};

