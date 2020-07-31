import { Http } from "../utils/http";

class Banner {
  static locationB = 'b-1'
  static locationG = 'b-2'
  static async getHomeLocationB() {
    const url = `/banner/name/${this.locationB}`
    return await Http.reqeust(url)
  }

  static async getHomeLocationG() {
    const url = `/banner/name/${this.locationG}`
    return await Http.reqeust(url)
  }
}
export {
  Banner
}