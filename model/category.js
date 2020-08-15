import { Http } from "../utils/http";

class Category {
  static async getHomeLocationC() {
    const url = '/category/grid/all'
    return await Http.reqeust(url)
  }

  static async getAllCategory() {
    const url = '/category/all'
    return await Http.reqeust(url)
  }

}

export {
  Category
}