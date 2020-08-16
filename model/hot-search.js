import { Http } from "../utils/http"

export class HotSearch {
  static async getHotTags() {
    return await Http.reqeust("/tag/type/1")
  }
}