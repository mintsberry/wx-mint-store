import { Http } from "../utils/http";

export class Theme {
  static locationA = 't-1'
  static locationE = 't-2'
  static locationF = 't-3'
  static locationH = 't-4'

  themes = []

  async getThemeGroup() {
    const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
    const url = `/theme/by/names`
    this.themes =(await Http.reqeust(url, {
      names
    })).data
    console.log(this.themes)
  }

  getHomeLocationA() {
    return this.themes.find(el => el.name === Theme.locationA)
  }
  getHomeLocationE() {
    return this.themes.find(el => el.name === Theme.locationE)
  }
  getHomeLocationF() {
    return this.themes.find(el => el.name === Theme.locationF)
  }
  getHomeLocationH() {
    return this.themes.find(el => el.name === Theme.locationH)
  }
}