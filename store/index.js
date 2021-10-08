import { SEARCH_TYPE } from '~/assets/constants'

// initial state
export const state = () => ({
  searchType: SEARCH_TYPE.NOT_SELECTED,
  mainColor: 'green',
  searchStringParam: '',
  dateFrom: '',
  dateTo: '',
  timeFrom: '',
  timeTo: '',
  searchDate: '',
  hasError: false,
  errorMessage: '',
  isLoading: false,
})

// getters
export const getters = {}

// actions
export const actions = {
  search({ state, dispatch }) {
    dispatch('clearSearchResults')
    if (state.searchType === SEARCH_TYPE.AIRPORT) {
      dispatch('airports/getAirportsByText')
    } else if (state.searchType === SEARCH_TYPE.FLIGHT) {
      dispatch('flights/getFlights')
    } else {
      console.warn('invalid search type')
    }
  },

  changeSearchType({ commit, dispatch }, payload) {
    dispatch('clearSearch')
    commit('setSearchType', payload)
  },

  clearSearch({ dispatch }) {
    dispatch('clearSearchParams')
    dispatch('clearSearchResults')
  },

  clearSearchResults({ dispatch, commit }) {
    commit('setError', { errorState: false, message: '' })
    commit('airports/setAirports', { airports: null })
    dispatch('clearCurrentAirport')
    commit('flights/setFlights', { flights: null })
    commit('flights/setArrivals', { arrivals: [] })
    commit('flights/setDepartures', { departures: [] })
  },

  clearSearchParams({ dispatch, commit }) {
    commit('setSearchStringParam', { searchStringParam: '' })
    commit('setSearchDate', { searchDate: '' })
    dispatch('clearToFromDates')
  },

  clearToFromDates({ commit }) {
    commit('set', { varName: 'dateTo', value: '' })
    commit('set', { varName: 'dateFrom', value: '' })
    commit('set', { varName: 'timeTo', value: '' })
    commit('set', { varName: 'timeFrom', value: '' })
  },

  clearCurrentAirport({ commit }) {
    commit('airports/setCurrentAirport', { currentAirport: null })
  },
}

// mutations
export const mutations = {
  setSearchType(state, { searchType }) {
    state.searchType = searchType
    if (searchType === SEARCH_TYPE.AIRPORT) {
      state.mainColor = 'orange'
    } else if (searchType === SEARCH_TYPE.FLIGHT) {
      state.mainColor = 'blue'
    } else {
      state.mainColor = 'green'
    }
  },
  setSearchStringParam(state, { searchStringParam }) {
    state.searchStringParam = searchStringParam
  },
  setSearchDate(state, { searchDate }) {
    state.searchDate = searchDate
  },
  set(state, { varName, value }) {
    state[varName] = value
  },
  setError(state, { errorState, message }) {
    state.hasError = errorState
    state.errorMessage = message
  },
  setLoading(state, param) {
    state.isLoading = param
  },
}
