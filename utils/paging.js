const { Http } = require("./http")

export class Paging {
  url
  start 
  count
  moreData = true
  accumulator = []
  locker = false

  constructor(url, count = 0, start = 0) {
    this.url = url
    this.start = start
    this.count = count
  }

  async getMoreData() {
    if (!this.moreData) return //没有更多数据
    if (!this._getLocker) return  //获取锁失败
    const data = await this._getActualData()
    this._releaseLocker()
    return data;
  }

  async _getActualData() {
    let paging = await Http.reqeust(this.url, {
      start: this.start,
      count: this.count
    })
    if (!paging) return null
    //数据为空
    if(paging.total === 0) {
      return {
        empty: true,
        items: [],
        moreData: false,
        accumulator: []
      }
    }

    this.moreData = this._moreData(paging.total_page, paging.page)
    if (this.moreData) {
      this.start += this.count
    }

    this.accumulator = this.accumulator.concat(paging.items)

    return {
      empty: false,
      items: paging.items,
      moreData: this.moreData,
      accumulator: this.accumulator
    }
  }

  _moreData(totalPage, pageNum) {
    return pageNum < totalPage - 1
  }

  _getLocker() {
    if (this.locker) {
      return false
    }
    thiss.locker = true
    return true;
  }

  _releaseLocker() {
    this.locker = false
  }
}