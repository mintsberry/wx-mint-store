Component({
  data: {},
  properties: {
    banner: Object
  },
  observers: {
    'banner': function(banner) {
      if (!banner || banner.items.length === 0) return 
      const left = banner.items.find(el => el.name === "left")
      const rightTop = banner.items.find(el => el.name === "right-top")
      const rightBottom = banner.items.find(el => el.name === "right-bottom")
      this.setData({
        left,
        rightBottom,
        rightTop,
      })
    }
  },

  methods: {}
})