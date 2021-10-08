import axios from 'axios'
import { apiHost, apiKey } from '~/assets/config'

export class FlightService {
  static async getFlightsById(number, date) {
    const data = await axios.request({
      method: 'GET',
      url: `https://aerodatabox.p.rapidapi.com/flights/number/${number}/${date}`,
      headers: {
        'x-rapidapi-host': apiHost,
        'x-rapidapi-key': apiKey,
      },
    })

    return data.data
  }

  static async getFlightsByAirportICAO({ icao, dateFrom, dateTo }) {
    // date format: 2021-10-01T00:00
    const data = await axios.request({
      method: 'GET',
      url: `https://aerodatabox.p.rapidapi.com/flights/airports/icao/${icao}/${dateFrom}/${dateTo}`,
      headers: {
        'x-rapidapi-host': apiHost,
        'x-rapidapi-key': apiKey,
      },
    })

    return data.data
  }

  static normalizeArrival(flight) {
    return {
      aircraft: {
        model: flight.model,
      },
      airline: {
        name: flight.airline.name,
      },
      status: flight.status,
      number: flight.number,
      arrival: {
        actualTimeLocal: flight.movement.actualTimeLocal,
        actualTimeUtc: flight.movement.actualTimeLocal,
        scheduledTimeLocal: flight.movement.scheduledTimeLocal,
        scheduledTimeUtc: flight.movement.scheduledTimeUtc,
        airport: {
          iata: flight.movement.airport.iata,
          icao: flight.movement.airport.icao,
          name: flight.movement.airport.name,
        },
      },
    }
  }

  static normalizeDeparture(flight) {
    return {
      aircraft: {
        model: flight.model,
      },
      airline: {
        name: flight.airline.name,
      },
      status: flight.status,
      number: flight.number,
      departure: {
        actualTimeLocal: flight.movement.actualTimeLocal,
        actualTimeUtc: flight.movement.actualTimeLocal,
        scheduledTimeLocal: flight.movement.scheduledTimeLocal,
        scheduledTimeUtc: flight.movement.scheduledTimeUtc,
        airport: {
          iata: flight.movement.airport.iata,
          icao: flight.movement.airport.icao,
          name: flight.movement.airport.name,
        },
      },
    }
  }
}

// const mockFlight = {
//   aircraft: {
//     model: 'W39',
//     reg: 'PH-BXO',
//   },
//   airline: {
//     name: 'KLM',
//   },
//   arrival: {
//     actualTimeLocal: '2020-03-28 14:29+01:00',
//     actualTimeUtc: '2020-03-28 13:29Z',
//     airport: {
//       countryCode: 'NL',
//       iata: 'AMS',
//       icao: 'EHAM',
//       location: {
//         lat: 52.3086,
//         lon: 4.763889,
//       },
//       municipalityName: 'Amsterdam',
//       name: 'Amsterdam, Amsterdam Schiphol',
//       shortName: 'Schiphol',
//     },
//     baggageBelt: '11',
//     gate: 'D66',
//     scheduledTimeLocal: '2020-03-28 14:10+01:00',
//     scheduledTimeUtc: '2020-03-28 13:10Z',
//     terminal: '2',
//   },
//   callSign: 'KLM1846',
//   codeshareStatus: 'IsOperator',
//   departure: {
//     actualTimeLocal: '2020-03-28 13:05+01:00',
//     actualTimeUtc: '2020-03-28 12:05Z',
//     airport: {
//       countryCode: 'AT',
//       iata: 'VIE',
//       icao: 'LOWW',
//       location: {
//         lat: 48.1103,
//         lon: 16.5697,
//       },
//       municipalityName: 'Vienna',
//       name: 'Vienna, Schwechat',
//       shortName: 'Schwechat',
//     },
//     checkInDesk: '301-318',
//     gate: 'F12',
//     scheduledTimeLocal: '2020-03-28 12:15+01:00',
//     scheduledTimeUtc: '2020-03-28 11:15Z',
//     terminal: 'T3',
//   },
//   isCargo: false,
//   lastUpdatedUtc: '2020-03-29 19:26Z',
//   number: 'KL 1846',
//   status: 'Arrived',
// }
