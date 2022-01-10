export const fetchSaladsType = {
  FETCH_SALADS: "FETCH_SALDS",
  FETCH_SALADS_SUCCES: "FETCH_SALADS_SUCCES",
  FETCH_SALADS_ERROR: "FETCH_SALADS_SUCCES",
};
const initialState = {
  salads: [],
  loading: false,
  error: null,
};

export const saladsReducer = (state = initialState, action) => {
  switch (action.type) {
    case fetchSaladsType.FETCH_SALADS:
      return { loading: true, error: null, salads: [] };
    case fetchSaladsType.FETCH_SALADS_SUCCES:
      return { loading: false, error: null, salads: action.payload };
    case fetchSaladsType.FETCH_SALADS_ERROR:
      return { loading: false, error: action.payload, salads: [] };
    default:
      return state;
  }
};
