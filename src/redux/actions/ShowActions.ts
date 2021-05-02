export enum ShowActionTypes {
  FETCH_SHOWS = "FETCH_SHOWS",
  FETCH_SHOWS_SUCCESS = "FETCH_SHOWS_SUCCESS",
  SEARCH_SHOW = "SEARCH_SHOW",
  SEARCH_SHOW_SUCCESS = "SEARCH_SHOW_SUCCESS",
}

export default class ShowActions {
  static fetchShowsAction = () => ({
    type: ShowActionTypes.FETCH_SHOWS,
  });
  static fetchShowsSuccessAction = (data: any[]) => ({
    type: ShowActionTypes.FETCH_SHOWS_SUCCESS,
    payload: data,
  });
  static searchShowAction = () => ({
    type: ShowActionTypes.SEARCH_SHOW,
  });
  static searchShowSuccessAction = (data: any[]) => ({
    type: ShowActionTypes.SEARCH_SHOW_SUCCESS,
    payload: data,
  });
}
