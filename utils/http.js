import { config } from "../config/config"
import promisic from "./promisic"

class Http {
  static async reqeust(url, data, method = 'GET') {
    url = config.apiBaseUrl + url 
    return await promisic(wx.request)({
      url,
      data,
      header: {
        'content-type':'application/json',
        'appkey': config.appkey
      },
      method,
      dataType: 'json',
      responseType: 'text',
      complete: ()=>{}
    })
  }
}

export {
  Http
}