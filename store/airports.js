import { AirportService } from '~/api/airportServce'

export const state = () => ({
  currentAirport: null,
  airports: null,
})

export const mutations = {
  setCurrentAirport(state, { airport }) {
    state.currentAirport = airport
  },
  setAirports(state, { airports }) {
    state.airports = airports
  },
}

export const actions = {
  async getAirportByICAO({ commit, rootState }) {
    const res = await AirportService.getAirportByICAO(
      rootState.searchStringParam
    )
    commit('setCurrentAirport', { airport: res })
  },
  async getAirportsByText({ commit, rootState }) {
    const res = await AirportService.getAirportsByText(
      rootState.searchStringParam,
      (e) => {
        commit('setError', { errorState: true, message: e }, { root: true })
      }
    )
    commit('setAirports', { airports: res })
  },
}
