const { FenceGroup } = require("../model/fence-group")
const { cellStatus } = require("../../config/constant")

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
    fences: [],
    selected: []
  },

  observers: {
    'spu': function(spu) {
      if (!spu) return 
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
      this.setData({
        fences: fenceGroup.fences
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tapSku(event) {
      const cell = event.detail.cell
      let fences = this.data.fences
      if (cell.status === "forbidden")  return
      if (cell.status === "selected") {
        fences[cell.row].values[cell.col].status = cellStatus.selected
      } else {
        fences[cell.row].values[cell.col].status = cellStatus.selected
      }
      this.setData({
        fences
      })
    },
    removeSelect(id) {

    }
  }
})
