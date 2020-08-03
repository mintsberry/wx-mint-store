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

  init() {
    console.log
    this.specs.forEach(el => {
      const fenceCell = new FenceCell(el.value_id, el.value)
      this.values.push(fenceCell)
    })
  }

}