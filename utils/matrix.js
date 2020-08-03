export class Matrix {
  m

  constructor(m) {
    this.m = m
  }

  get colNums() {
    return this.m[0].length
  }

  get rowNums() {
    return this.m.length
  }

  transpose() {
    let emp = []
    for (let i = 0; i < this.colNums; i++) {
      emp[i] = []
      for (let j = 0; j < this.rowNums; j++) {
        emp[i][j] = this.m[j][i]
      }
    }
    return emp
  }

  forEach(cb) {
    for (let i = 0; i < this.rowNums; i++) {
      for (let j = 0; j < this.colNums; j++) {
        cb(this.m[i][j], i, j)
      } 
    }
  }
}