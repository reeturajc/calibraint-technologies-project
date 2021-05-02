import { Http } from "../http";

export class ShowApi {
  // Fetch Shows
  static fetchShows(pageNo: number) {
    return Http.get(`/shows?page=${pageNo}`);
  }
  // Search Show
  static searchShow(query: string) {
    return Http.get(`/search/shows?q=${query}`);
  }
  // Fetch Single Show
  static fetchSingleShow(id: number) {
    return Http.get(`/shows/${id}?embed[]=seasons&embed[]=episodes`);
  }
}
