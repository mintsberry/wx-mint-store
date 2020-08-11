import { Http } from "../utils/http";

export class Spu {
  static async getDetailById(id) {
    const url = `/spu/id/${id}/detail`
    return await Http.reqeust(
      url
    )
  }

  static isNoSpec(spu) {
    if(spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0){
      return true
    }
    return false
}
}