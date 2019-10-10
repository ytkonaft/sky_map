import axios from 'axios'

class MapboxService {

    constructor() {
        this.url = "https://api.mapbox.com/geocoding/v5/mapbox.places"
        this.apiKey = "pk.eyJ1IjoibWFrc2ltOTg5IiwiYSI6ImNqeDY0OXZrbzA4Nnk0ZHF1bG9ybmxvNGsifQ.-OcDOS1w1vyn8poaNOtsDg"
        this.params = "types=place&language=ru"
    }

    collectUrl(input) {
        return `${this.url}/${input}.json?${this.params}&access_token=${this.apiKey}`
    }

    getCities(input) {
        return axios.get(this.collectUrl(input))
        .then(response => {
            return response.data
        });
    }
}

export default new MapboxService()