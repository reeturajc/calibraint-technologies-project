import ShowActions from "../../redux/actions/ShowActions";
import { ShowApi } from "./ShowApi";

export class ShowApiRepository {
  static fetchShows(pageNo: number) {
    return async (dispatch: any) => {
      try {
        dispatch(ShowActions.fetchShowsAction());
        const data = await ShowApi.fetchShows(pageNo);
        if (data) {
          dispatch(ShowActions.fetchShowsSuccessAction(data));
        }
        return data;
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
  static searchShow(query: string) {
    return async (dispatch: any) => {
      try {
        dispatch(ShowActions.searchShowAction());
        if (query !== "") {
          const data = await ShowApi.searchShow(query);
          if (data) {
            dispatch(ShowActions.searchShowSuccessAction(data));
          }
          return data;
        } else {
          const data = await ShowApi.fetchShows(0);
          if (data) {
            dispatch(ShowActions.fetchShowsSuccessAction(data));
          }
          return data;
        }
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
  static fetchSingleShow(id: number) {
    return async (dispatch: any) => {
      try {
        const data = await ShowApi.fetchSingleShow(id);

        return data;
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
}
