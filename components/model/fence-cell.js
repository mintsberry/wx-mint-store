
export class FenceCell {
  title
  id
  status
  spec
  row
  col
  constructor(id, title, spec, row, col) {
    this.id = id
    this.title = title
    this.spec = spec
    this.row = row
    this.col = col
  }
}