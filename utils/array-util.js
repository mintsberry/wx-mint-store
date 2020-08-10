export class ArrayUtil {
  static NotEmptyLength(array) {
    return array.reduce((total, el) => {
      if (el === undefined || el === null) return total
      return total+1
    }, 0)
  }

  static NotEmptyArray() {
    
  }
}