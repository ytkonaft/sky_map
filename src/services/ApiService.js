import testData from '../assets/download'
import AjaxService from './AjaxService'

class ApiService {
  constructor () {
    /*AjaxService.makeGetRequest('get')
      .then(response => {
        console.log(response.data)
        if (response.data.success === 'true') {
        }
      })
      .catch(error => {
        console.log(error)
      })*/

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
}

export default new ApiService()
