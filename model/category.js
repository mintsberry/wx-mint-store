import { Http } from "../utils/http";

class Category {
  static async getHomeLocationC() {
    const url = '/category/grid/all'
    return await Http.reqeust(url)
  }
}

export {
  Category
}