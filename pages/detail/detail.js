const {
  Spu
} = require("../../model/spu")
const {
  orderWay
} = require("../../config/constant")
const { SaleExplain } = require("../../model/sale-explain")

// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spu: null,
    orderWay: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const id = options.id
    const spu = await Spu.getDetailById(id)
    const explain = await SaleExplain.getFixed(explain)
    this.setData({
      spu,
      explain
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
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  onAddToCart(event) {
    this.setData({
      showRealm: true,
      orderWay: orderWay.CART
    })
  },

  onBuy(event) {
    this.setData({
      showRealm: true,
      orderWay: orderWay.BUY
    })
  },

  onGotoHome(event) {
    wx.switchTab({
      url: '/pages/home/home'
    })
  },

  onGotoCart(event) {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },

  onSpecChange(event) {
    this.setData({
      specs: event.detail
    })
  },
})