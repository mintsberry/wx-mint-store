import { Http } from "../utils/http";

class Categories {
  roots = []
  subs = []

  async init() {
    const url = '/category/all'
    const categories = await Http.reqeust(url)
    this.roots = categories.roots
    this.subs = categories.subs
  }

  getRoots() {
    return this.roots
  }

  getSubs(parentId) {
    const subs = this.subs
    const currentSubs = subs.filter(sub => {
      return sub.parent_id == parentId
    })
    return currentSubs
  }
  
  getBannerImg(id) {
    return this.roots.find(root => {
      return root.id == id
    }).img
  }
  
}

export {
  Categories
}