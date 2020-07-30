const { Http } = require("../utils/http")

export class Activity {
  static async getHomeLocationD() {
    const name = 'a-2'
    const url = `/activity/name/${name}`
    return await Http.reqeust(url)
  }
}
