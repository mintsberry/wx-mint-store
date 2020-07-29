import { Http } from "../utils/http";

class Category {
  static async getGridCategory() {
    const url = '/category/grid/all'
    return await Http.reqeust(url)
  }
}

export {
  Category
}