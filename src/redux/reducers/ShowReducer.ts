import { ShowActionTypes } from "../actions/ShowActions";

interface ShowReducerState {
  showData: any[];
  loadingFlag: boolean;
}
const initialState: ShowReducerState = {
  showData: [],
  loadingFlag: false,
};

export const ShowReducer = (
  state = initialState,
  action: any
): ShowReducerState => {
  switch (action.type) {
    case ShowActionTypes.FETCH_SHOWS: {
      return { ...state, loadingFlag: true };
    }
    case ShowActionTypes.FETCH_SHOWS_SUCCESS: {
      return {
        ...state,
        loadingFlag: false,
        showData: [...state.showData, ...action.payload],
      };
    }
    case ShowActionTypes.SEARCH_SHOW: {
      return { ...state, loadingFlag: true, showData: [] };
    }
    case ShowActionTypes.SEARCH_SHOW_SUCCESS: {
      return {
        ...state,
        loadingFlag: false,
        showData: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
