import { Http } from "../utils/http";

class Banner {
  static locationB = 'b-1'
  static async getHomeLocationB() {
    const url = `/banner/name/${this.locationB}`
    return await Http.reqeust(url)
  }
}
export {
  Banner
}