import { Http } from "../utils/http";

export class Spu {
  static async getDetailById(id) {
    const url = `/spu/id/${id}/detail`
    return await Http.reqeust(
      url
    )
  }
}