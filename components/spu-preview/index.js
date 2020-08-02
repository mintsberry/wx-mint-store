Component({
  data: {
    tags: Array
  },
  properties: {
    data: Object
  },
  observers: {
    data: function (data) {
      if (!data) {
        return
      }
      if (!data.tags) {
        return
      }
      const tags = data.tags.split('$')
      this.setData({
        tags
      })
    }
  },
  methods: {
    // loadImg(event) {
    //   const {
    //     innerWidth,
    //     innerHeight
    //   } = event.detail
    //   this.setData({
    //     width: 340,
    //     height: 340 * innerHeight / innerWidth
    //   })
    // }
  }
})