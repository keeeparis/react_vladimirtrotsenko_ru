import axios from "axios"

export default class ApiRequest {
    static async getData(coords) {
        const response = await axios.get('http://api.weatherapi.com/v1/current.json', {
            params: {
                key: '827269b104da4cca8e7161054212110',
                // eslint-disable-next-line
                q: `${coords[0], coords[1]}`,
                lang: 'ru'
            }
        })
        const result = await response.json()
        return result
    }

    static async getCoords(city) {
        const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
            params: {
                key: '227110303242476cae97b6c40e24a8e1',
                q: city
            }
        })
        const result = await response.json()
        return result
    }
    //TODO: проблема в функции ниже.
    static async getSuggestions(city) {
        const response = await axios.get('https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json', {
            params: {
                apiKey: 'hOx1xpIrCP70JtJChd0PD_eY13XuFsnir7X5yk6k7OU',
                query: city,
                maxresults: 10,
                resultType: 'city',
                language: 'ru'
            }
        })
        const result = await response.json()
        return result
    }
}