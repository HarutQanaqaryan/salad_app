export const DATA_SALAD_STORAGE = "DATA_SALAD_STORAGE";
export const fetchSaladsType = {
  FETCH_SALADS: "FETCH_SALDS",
  FETCH_SALADS_SUCCES: "FETCH_SALADS_SUCCES",
  FETCH_SALADS_ERROR: "FETCH_SALADS_SUCCES",
  ADDED_SALAD: "ADDED_SALAD",
};

const initialState = {
  salads: JSON.parse(localStorage.getItem(DATA_SALAD_STORAGE)) || [],
  loading: false,
  error: false,
};

export const saladsReducer = (state = initialState, action) => {
  switch (action.type) {
    case fetchSaladsType.FETCH_SALADS:
      return { loading: true, error: false, salads: [] };
    case fetchSaladsType.FETCH_SALADS_SUCCES:
      return { loading: false, error: false, salads: action.payload };
    case fetchSaladsType.FETCH_SALADS_ERROR:
      return { loading: false, error: true, salads: [] };
    case fetchSaladsType.ADDED_SALAD:
      return {
        ...state,
        salads: state.salads.map((salad) =>
          salad.dataSalad._id === action.id
            ? { ...salad, isAdded: action.added }
            : salad
        ),
      };
    default:
      return state;
  }
};
