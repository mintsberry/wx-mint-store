export class HistorySearch {
  MAX_SAVE_LENGTH = 20
  SAVE_KEY = "search_history_cache"
  history = []

  constructor() {
    if (HistorySearch._instance) {
      return SearchHistory._instance
    }
    this.history = this._getFromCache()
    HistorySearch._instance = this
  }

  save(keyword) {
    const index = this.history.findIndex(el => {
      return el === keyword
    })
    if (index !== -1) {  //已存在搜索历史
      this.history.splice(index, 1)
    }
    if (this.history.length >= this.MAX_SAVE_LENGTH) {  //超过储存数量
      this.history.pop()
    }
    this.history.unshift(keyword)
    this._saveToCache()
    return this.history
  }

  get() {
    return this.history
  }

  clean() {
    this.history = []
    this._saveToCache()
  }

  _saveToCache() {
    return wx.setStorageSync(this.SAVE_KEY, this.history);
  }

  _getFromCache() {
    const cache = wx.getStorageSync(this.SAVE_KEY);
    if (!cache) {
      return []
    }
    return cache
  }
}