import testData from '../assets/download'
import AjaxService from './AjaxService'

class ApiService {
  constructor () {
    AjaxService.makeGetRequest('get')
      .then(response => {
        console.log(response.data)
        if (response.data.success === 'true') {
        }
      })
      .catch(error => {
        console.log(error)
      })

    this.apiOptions = testData.data
  }

  getStyles () {
    return this.apiOptions.styles
  }

  getPrices () {
    return this.apiOptions.prices
  }

  getBorders () {
    return this.apiOptions.borders
  }

  getSizes () {
    return this.apiOptions.sizes
  }
}

export default new ApiService()
