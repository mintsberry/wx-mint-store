import {
  Http
} from "../utils/http";
import {
  Paging
} from "../utils/paging";

export class Search {
  static search(q) {
    console.log(q)
    return new Paging(`/search?q=${q}`)
  }
}