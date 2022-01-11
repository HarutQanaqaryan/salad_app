export const DATA_SALAD_STORAGE = "DATA_SALAD_STORAGE";
export const fetchMoleculesType = {
  FETCH_MOLECULES: "FETCH_MOLECULES",
  FETCH_MOLECULES_SUCCES: "FETCH_MOLECULES_SUCCES",
  FETCH_MOLECULES_ERROR: "FETCH_MOLECULES_SUCCES",
};

const initialState = {
  molecules: [],
  loading: false,
  error: false,
};

export const moleculesReducer = (state = initialState, action) => {
  switch (action.type) {
    case fetchMoleculesType.FETCH_MOLECULES:
      return { loading: true, error: false, molecules: [] };
    case fetchMoleculesType.FETCH_MOLECULES_SUCCES:
      return { loading: false, error: false, molecules: action.payload };
    case fetchMoleculesType.FETCH_MOLECULES_ERROR:
      return { loading: false, error: true, molecules: [] };
    default:
      return state;
  }
};
