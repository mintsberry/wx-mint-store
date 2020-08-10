import { FenceCell } from './fence-cell'

export class Fence {
  id
  attr
  values = []
  specs

  constructor(id, attr, specs) {
    this.id = id
    this.attr = attr
    this.specs = specs
  }

  init(row) {
    console.log(this.specs)
    this.specs.forEach((el, col) => {
      const fenceCell = new FenceCell(el.value_id, el.value, this.specs[col], row, col)
      this.values.push(fenceCell)
    })
  }

}