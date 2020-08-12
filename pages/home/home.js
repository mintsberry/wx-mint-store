import { Theme } from "../../model/theme"
import { Banner } from "../../model/banner"
import { Category } from "../../model/category"
import { Activity } from "../../model/activity"
import { Paging } from "../../utils/paging"
import { SpuPaging } from "../../model/spu-paging"
import { loadType } from "../../config/constant"



Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    themeE: null,
    themeF: null,
    themeH: null,
    activity: null,
    bannerB: null,
    spuPaging: null,
    loadType: loadType.LOADING,
    themeESpu: [],
    grid: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.initAllData()
    this.initBottomSpuList()
  },

  async initBottomSpuList() {
    this.spuPaging = SpuPaging.getLatestPaging()
    const data = await this.spuPaging.getMoreData()
    if (!data) {
      return 
    }
    wx.lin.renderWaterFlow(data.items)
  },

  async initAllData() {
    const theme = new Theme()
    await theme.getThemeGroup()
    const themeA = theme.getHomeLocationA()
    const themeE = theme.getHomeLocationE()
    let themeESpu = []
    if (themeE.online) {
      const data = await Theme.getHomeLocationESpu()
      themeESpu = data.spu_list.slice(0, 8)
    }
    const themeF = theme.getHomeLocationF()
    const themeH = theme.getHomeLocationH()
    const bannerB = await Banner.getHomeLocationB()
    const bannerG = await Banner.getHomeLocationG()
    const grid = await Category.getHomeLocationC()
    const activity = await Activity.getHomeLocationD()
    this.setData({
      themeA,
      themeE,
      themeF,
      themeH,
      themeESpu,
      bannerB,
      bannerG,
      grid,
      activity,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */ 
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   * 
   *  empty: true,
        items: [],
        moreData: false,
        accumulator: []
   */
  onReachBottom: async function () {
    const data = await this.spuPaging.getMoreData()
    if (!data) return 
    wx.lin.renderWaterFlow(data.items)
    if (!data.moreData) {
      this.setData({
        loadType: loadType.END
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})