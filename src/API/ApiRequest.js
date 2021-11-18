import axios from "axios"

// use a CORS proxy to avoid “No Access-Control-Allow-Origin header” problems
// https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141#43881141
const herokuProxy = 'https://frozen-ocean-28906.herokuapp.com/'

export default class ApiRequest {
    static async getData(coords) {
        try {
            const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json`, {
                params: {
                    key: '827269b104da4cca8e7161054212110',
                    q: `${coords.lat}, ${coords.lng}`,
                    hour: '',
                    lang: 'ru',
                    days: 2
                },
                headers: {
                    'cache-control': 'public, max-age=60',
                    'content-type': 'application/json'
                }
            })
            return response.data
        } catch (e) {}
    }

    static async getCoords(city) {
        try {
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
                params: {
                    key: '227110303242476cae97b6c40e24a8e1',
                    q: city
                }
            })
            return response.data.results[0].geometry
        } catch (e) {}
    }

    static async getSuggestions(city) {
        try {
            const response = await axios.get(`${herokuProxy}https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json`, {
                params: {
                    apiKey: 'hOx1xpIrCP70JtJChd0PD_eY13XuFsnir7X5yk6k7OU',
                    query: city,
                    maxresults: 10,
                    resultType: 'city',
                    language: 'ru, en'
                }
            })
            return response.data
        } catch(e) {}
    }
}