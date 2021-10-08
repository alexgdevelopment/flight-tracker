import { AirportService } from '~/api/airportServce'
import { FlightService } from '~/api/flightService'

export const state = () => ({
  currentFlight: null,
  flights: null,
  arrivals: [],
  departures: [],
})

export const mutations = {
  setCurrentFlight(state, { flight }) {
    state.currentFlight = flight
  },
  setFlights(state, { flights }) {
    state.flights = flights
  },
  setArrivals(state, { arrivals }) {
    state.arrivals = arrivals
  },
  setDepartures(state, { departures }) {
    state.departures = departures
  },
}

export const actions = {
  async getFlights({ commit, rootState }) {
    const data = await FlightService.getFlightsById(
      rootState.searchStringParam,
      rootState.searchDate
    )
    commit('setFlights', { flights: data })
  },

  async getFlightsForAirport({ commit, rootState }) {
    commit('setError', { errorState: false, message: '' }, { root: true })

    commit('setArrivals', { arrivals: [] })
    commit('setDepartures', { departures: [] })
    let icao = rootState.airports.currentAirport.icao
    if (!icao) {
      icao = await AirportService.getAirportICAOByIATA(
        rootState.airports.currentAirport.iata
      )
    }
    const dateFrom = rootState.dateFrom + 'T' + rootState.timeFrom
    const dateTo = rootState.dateTo + 'T' + rootState.timeTo
    const data = await FlightService.getFlightsByAirportICAO({
      icao,
      dateFrom,
      dateTo,
      errorCb: (e) => {
        commit('setError', { errorState: true, message: e }, { root: true })
      },
    })
    const arrivals = data.arrivals.map((arrival) =>
      FlightService.normalizeArrival(arrival)
    )
    const departures = data.departures.map((departure) =>
      FlightService.normalizeDeparture(departure)
    )
    commit('setArrivals', { arrivals })
    commit('setDepartures', { departures })
  },
}
