import axios from 'axios'
import testData from '../assets/download'

class AjaxService {
  constructor () {
    // this.siteUrl = process.env.VUE_APP_API_URL
    this.siteUrl = process.env.VUE_GET_API
    this.apiVersion = 'api/sky/'

    this.apiOptions = testData.data
  }

  getApiUrl () {
    return `${this.siteUrl}/${this.apiVersion}`
  }

  makeGetRequest (url, data = null, headers = null) {
    let params = {
      params: data
    }
    if (headers) params.headers = headers

    return this._makeRequest(url, params)
  }

  makePostRequest (url, data, headers = null) {
    return this._postDataRequest(url, 'POST', data, headers)
  }

  _postDataRequest (url, method, data, headers) {
    let defaultHeader = {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    let compiledHeaders = !headers ? defaultHeader : { ...defaultHeader, ...headers }
    let params = {
      data: data,
      method: method,
      credentials: 'include',
      headers: compiledHeaders
    }

    return this._makeRequest(url, params)
  }

  _makeRequest (url, params) {
    return axios(this.getApiUrl() + url, params).then(response => {
      return response.data
    })
  }
}

export default new AjaxService()
