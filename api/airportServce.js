import axios from 'axios'
import {
  airportCodesApiKey,
  airportCodesApiSecret,
  apiHost,
  apiKey,
} from '~/assets/config'

export class AirportService {
  static async getAirportICAOByIATA(searchTerm) {
    const data = await axios.request({
      method: 'GET',
      url: `https://aerodatabox.p.rapidapi.com/airports/iata/${searchTerm}`,
      headers: {
        'x-rapidapi-host': apiHost,
        'x-rapidapi-key': apiKey,
      },
    })

    return data.data.icao
  }

  static async getAirportsByText(searchTerm, errorCb) {
    const data = await axios.request({
      method: 'GET',
      url: `https://www.air-port-codes.com/api/v1/multi?term=${searchTerm}`,
      headers: {
        Accept: 'application/json',
        'APC-Auth': airportCodesApiKey,
        'APC-Auth-Secret': airportCodesApiSecret,
      },
    })
    if (data.data.statusCode !== 200) {
      return errorCb(data.data.message)
    }
    const normalized = data.data.airports.map((airport) => {
      return this.normalizeAPCAirport(airport)
    })
    return normalized
  }

  static normalizeAPCAirport(airport) {
    return {
      fullName: airport.name,
      iata: airport.iata,
      icao: airport.icao,
      location: {
        latitude: airport.latitude,
        longitude: airport.longitude,
      },
      country: {
        code: airport.country.iso,
        name: airport.country.name,
      },
    }
  }
}

// const mockAirport = {
//   icao: 'EDDF',
//   iata: 'FRA',
//   shortName: 'Frankfurt-am-Main',
//   fullName: 'Frankfurt-am-Main',
//   municipalityName: 'Frankfurt-am-Main',
//   location: {
//     lat: 50.0264,
//     lon: 8.543129,
//   },
//   country: {
//     code: 'DE',
//     name: 'Germany',
//   },
//   continent: {
//     code: 'EU',
//     name: 'Europe',
//   },
//   timeZone: 'Europe/Berlin',
//   urls: {
//     WebSite: 'http://www.frankfurt-airport.de/',
//     Wikipedia: 'https://en.wikipedia.org/wiki/Frankfurt_Airport',
//     Twitter: 'http://twitter.com/Airport_FRA',
//     GoogleMaps: 'https://www.google.com/maps/@50.026401,8.543129,14z',
//     AirportRadar: 'https://www.airportradar24.com/50.03,8.54/14',
//   },
// }

// export default mockAirport
