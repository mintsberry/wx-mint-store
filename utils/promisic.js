export default (func) => {
  return function(params = {}) {
    return new Promise((reslove, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          reslove(res)
        },
        fail: (error) => {
          reject(error)
        }
      })
      func(args)
    })
  }
}