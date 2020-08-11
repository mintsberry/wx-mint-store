import { Matrix } from '../../utils/matrix'
import { Fence } from './fence'
export class FenceGroup {
  spu
  skuList = []
  fences = []

  constructor(spu) {
      this.spu = spu
      this.skuList = spu.sku_list
  }
  
  initFences() {
    const fences = []
    let matrix = this._createMatrix(this.skuList)
    let AT = matrix.transpose() //转置
    let m = this._distinct(AT) //去重
    m.forEach((f, row) => {  //获取转置后每一列
      let fence = new Fence(f[0].key_id, f[0].key, f)
      fence.init(row)
      fences.push(fence)
    })
    this.fences = fences
    console.log(this.fences)
  }

  setCellStatusById(cellId, status) {
    this.eachCell((cell) => {
        if (cell.id === cellId) {
            cell.status = status
        }
    })
  }

  eachCell(cb) {
    for (let i = 0; i < this.fences.length; i++) {
      for (let j = 0; j < this.fences[i].cells.length; j++) {
          const cell = this.fences[i].cells[j]
          cb(cell, i, j)
      }
    }
  }

  _createMatrix(skuList) {
    const m = []
    skuList.forEach(el => {
      m.push(el.specs)
    })
    return new Matrix(m) 
  }

  _distinct(m) {
    let fences = []
    m.forEach(el => {
      let fence = []
      el.forEach(f => {
        const existed = fence.some(s => {
          return f.value_id === s.value_id
        })
        if(existed){
          return
        }
        fence.push(f)
      })
      fences.push(fence)
    })
    return fences;
  }
}