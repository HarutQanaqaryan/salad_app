export const INGREDIENTS_STORAGE = "INGREDIENTS_STORAGE";

export const fetchMoleculesType = {
  FETCH_MOLECULES: "FETCH_MOLECULES",
  FETCH_MOLECULES_SUCCES: "FETCH_MOLECULES_SUCCES",
  FETCH_MOLECULES_ERROR: "FETCH_MOLECULES_SUCCES",
  SELECTED_MOLECULE: "SELECTED_MOLECULE",
};

const initialState = {
  molecules: JSON.parse(localStorage.getItem(INGREDIENTS_STORAGE)) || [],
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
    case fetchMoleculesType.SELECTED_MOLECULE:
      return {
        ...state,
        molecules: state.molecules.map((molecule) =>
          molecule.dataMolecules._id === action.id
            ? { ...molecule, isAdded: action.added }
            : molecule
        ),
      }
    default:
      return state;
  }
};
