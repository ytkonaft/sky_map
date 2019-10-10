import testData from '../assets/download'
import AjaxService from './AjaxService'

class SkyApiService extends AjaxService {

  constructor () {
    super()
    this.data = testData.data
  }

  getData () {
    return this.data
  }

  getStyles () {
    return this.data.styles
  }

  getPrices () {
    return this.data.prices
  }

  getBorders () {
    return this.data.borders
  }

  getSizes () {
    return this.data.sizes
  }

  generate(formData, headers={}) {
    return this.postRequest(`generator/starmap`, formData, headers)
    .then(response => {
        return response
    })
  }
}

export default new SkyApiService()
