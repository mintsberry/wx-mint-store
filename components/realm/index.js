const {
  FenceGroup
} = require("../model/fence-group")
const {
  cellStatus,
  cartCount
} = require("../../config/constant")
const {
  ArrayUtil
} = require("../../utils/array-util")
const {
  Spu
} = require("../../model/spu")

// components/realm/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object,
    orderWay: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    fences: [],
    selected: [],
    codes: [],
    fenceGroup: null,
    selectSpu: null,
    noSpec: false,
    isSelectedAll: false,
    count: cartCount.COUNT,
    outStock: false,
    tipInfo: undefined
  },

  observers: {
    'spu': function (spu) {
      if (!spu) return
      if (Spu.isNoSpec(spu)) {
        this.setData({
          noSpec: true,
          selectSpu: spu.sku_list[0]
        })
        return
      }
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences() //将商品可以选参数归类
      this.setData({
        fences: fenceGroup.fences,
        fenceGroup: fenceGroup
      })
      this._initCodes(spu) //将所有sku所有code组成数组
      this._initDefaultSelected(spu) //初始化默认选择
      this._changeDescOfSelected() //根据选中更改商品信息
      this._caclStock()
      this.triggerSpecEvent()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tapSku(event) {
      const cell = event.detail.cell
      let fences = this.data.fences
      if (cell.status === cellStatus.FORBIDDEN) return
      if (cell.status === cellStatus.SELECTED) {
        this.removeSelect(fences[cell.row].values[cell.col])
      } else {
        this.insertSelect(fences[cell.row].values[cell.col])
      }
      // 防止一行多选 初始化同一行状态
      this._currentRowInit(cell.row)
      //将所有选中cell 改成selected状态
      this._changeCellStatus()
      //计算商品规格可选项
      this._calcOptionalSku()
      //根据所选规格显示参数
      this._changeDescOfSelected()
      //计算库存
      this._caclStock()
      this._refreshStyle()
      this.triggerSpecEvent()
    },
    _initCodes(spu) {
      const list = spu.sku_list
      const codes = []
      list.forEach(item => {
        codes.push(item.code)
      })
      this.setData({
        codes
      })
    },
    _initDefaultSelected(spu) {
      if (!spu.default_sku_id) {
        this._changeDescOfSelected()
        this.setData({
          selectSpu: spu
        })
        return
      }
      const sku_id = spu.default_sku_id //获取默认的sku id
      const defalutSpu = spu.sku_list.find((item) => {
        return item.id === sku_id
      })
      if (!defalutSpu) {
        this._changeDescOfSelected()
        this.setData({
          selectSpu: spu
        })
        return
      }
      this.setData({
        selectSpu: defalutSpu
      })
      const specs = defalutSpu.specs
      this.data.fences.forEach((fence, index) => {
        const id = specs[index].value_id //获取默认商品属性id
        const cell = fence.values.find(cell => {
          return cell.id === id
        })
        cell.status = cellStatus.SELECTED
        this.data.selected[cell.row] = cell
      })
      this._calcOptionalSku()
      this._refreshStyle()
    },
    _calcOptionalSku() {
      const fences = this.data.fences
      //将所有待选sku与已选sku组合 并从codes中判断是否存在
      fences.forEach((fence, row) => {
        //复制已选的sku
        let selected = this.data.selected.slice()
        fence.values.forEach((cell, col) => {
          //对于已经选中的无需判定
          if (cell.status === cellStatus.SELECTED) return
          selected[row] = cell
          const code = this._jointCode(selected) //所选的sku拼接成字符串数组
          const flag = this._includeCode(code) //判断sku是否包含在codes中
          if (flag) {
            cell.status = cellStatus.UNSELECTED
          } else {
            cell.status = cellStatus.FORBIDDEN
          }
        })
      })
    },
    _changeDescOfSelected() {
      let isSelectedAll = false
      let tipInfo = null
      if (ArrayUtil.NotEmptyLength(this.data.selected) === this.data.fences.length) { //全选
        //获取选中的商品信息
        isSelectedAll = true
        tipInfo = this.data.selected.map(el => {
          return el.title
        }).toString()
        let code = this._jointCode(this.data.selected).join('#')
        let selectSpu = this.data.fenceGroup.skuList.find(el => {
          return el.code.includes(code)
        })
        this.setData({
          selectSpu
        })
      } else { //未选完整
        let unselected = []
        for (let i = 0; i < this.data.fences.length; i++) {
          if (!this.data.selected[i]) {
            unselected.push(this.data.fences[i].attr)
          }
        }
        tipInfo = unselected.toString()
      }
      this.setData({
        isSelectedAll,
        tipInfo
      })
    },
    onSelectCount(event) {
      const currentCount = event.detail.count
      this.data.count = currentCount
      if (this.data.isSelectedAll) {
        this._caclStock()
      }
    },
    _jointCode(array) {
      let code = []
      array.forEach(el => {
        if (!el) return
        let spec = el.spec
        let str = spec.key_id + '-' + spec.value_id
        code.push(str)
      })
      return code
    },
    _includeCode(selected) {
      const codes = this.data.codes
      return codes.some(el => {
        return selected.every(item => {
          return el.includes(item)
        })
      })
    },
    removeSelect(cell) {
      this.data.selected[cell.row] = null
    },
    insertSelect(cell) {
      this.data.selected[cell.row] = cell
    },
    _caclStock() {
      if (!this.data.isSelectedAll) return
      let outStock = false
      if (this.data.selectSpu.stock < this.data.count) {
        outStock = true
      }
      this.setData({
        outStock
      })
    },
    _changeCellStatus() {
      this.data.selected.forEach(cell => {
        if (!cell) return
        this.data.fences[cell.row].values[cell.col].status = cellStatus.SELECTED
      })
    },
    _currentRowInit(row) {
      this.data.fences[row].values.forEach(el => {
        el.status = cellStatus.UNSELECTED
      })
    },
    _refreshStyle() {
      this.setData({
        fences: this.data.fences
      })
    },
    triggerSpecEvent() {
      const noSpec = Spu.isNoSpec(this.properties.spu)
      if (noSpec) {
        this.triggerEvent('specchange', {
          noSpec
        })
      } else {
        this.triggerEvent('specchange', {
          noSpec: this.data.noSpec,
          isSelectedAll: this.data.isSelectedAll,
          tipInfo: this.data.tipInfo,
        })
      }
    }
  }
})