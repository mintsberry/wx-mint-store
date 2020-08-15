Component({
  data: {},
  properties: {
    bannerImg: String,
    categories: Array
  },
  methods: {
    onTapGridItem(event) {
      const id = event.detail.key
      this.triggerEvent('itemtap', {
        cid: id
      })
    },
    
  }
})