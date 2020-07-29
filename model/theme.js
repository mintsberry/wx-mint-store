import { Http } from "../utils/http";

export class Theme {
  static async getHomeLocationA(callback) {
    const url = `/theme/by/names`
    return await Http.reqeust(url, {
      names: 't-1'
    } )
  }
}