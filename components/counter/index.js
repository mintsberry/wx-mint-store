const { cartCount } = require("../../config/constant")

Component({
  data: {},
  properties: {
    count: {
      type: Number,
      value: cartCount.COUNT
  },
    min: {
        type: Number,
        value: cartCount.MIN
    },
    max: {
        type: Number,
        value: cartCount.MAX
    }
  },
  methods: {
    onOverStep(event) {
      const minOrMaxOut = event.detail.type
      if (minOrMaxOut == 'overflow_max') {
          wx.showToast({
              icon: "none",
              duration: 3000,
              title: `超出最大购买数量`
          })
      }
      if (minOrMaxOut == 'overflow_min') {
          wx.showToast({
              icon: "none",
              duration: 3000,
              title: `最少需要购买${cartCount.MIN}件噢`
          })
      }
    }
  }
})