const { FenceGroup } = require("../model/fence-group")

// components/realm/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    fences: []
  },

  observers: {
    'spu': function(spu) {
      if (!spu) return 
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
      console.log(fenceGroup.fences)
      this.setData({
        fences: fenceGroup.fences
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
