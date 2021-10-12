import { mount } from '@vue/test-utils'
import { Store } from 'vuex'
import Vuetify from 'vuetify'
import { addElemWithDataAppToBody } from './helpers'
import { mockAirport, mockFlight } from './mockObjects'
import AirportDetail from '@/components/AirportDetail.vue'
import AirportCard from '@/components/AirportCard.vue'
describe('Airport Detail', () => {
  let wrapper = null
  let state
  let store
  let vuetify
  let mutations
  let data
  let actions

  addElemWithDataAppToBody()

  beforeEach(() => {
    vuetify = new Vuetify()
    state = {
      mainColor: 'green',
    }
    mutations = {
      set: jest.fn(),
    }
    actions = {
      'flights/getFlightsForAirport': jest.fn(),
      clearToFromDates: jest.fn(),
      clearCurrentAirport: jest.fn(),
    }
    store = new Store({
      state,
      mutations,
      actions,
      modules: {
        airports: {
          state: {
            currentAirport: mockAirport,
          },
        },
        flights: {
          state: {
            arrivals: [mockFlight],
            departures: [mockFlight],
          },
        },
      },
    })
    data = () => ({
      dateFromPicker: false,
      timeFromPicker: false,
      dateToPicker: false,
      timeToPicker: false,
    })
    wrapper = mount(AirportDetail, {
      vuetify,
      stubs: {
        AirportCard: {
          template: '<div class="airport-card" />',
        },
        'v-time-picker': {
          template:
            '<div class="v-time-picker" @click="$store.commit(`set`)" />',
        },
        FlightCard: {
          template: '<div class="flight-card" />',
        },
      },
      data,
      store,
    })
  })
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  test('should show an airport card', () => {
    expect(wrapper.findComponent(AirportCard)).toBeTruthy()
  })

  test('should emit action on dateFrom change', async () => {
    await wrapper.find('[data-testid="dateFromTextField"').trigger('click')
    const dateFromPicker = wrapper.find('[data-testid="dateFromPicker"]')

    await dateFromPicker.find('tr > td > button').trigger('click')
    expect(mutations.set).toHaveBeenCalled()
  })
  test('should emit correct action on dateTo change', async () => {
    await wrapper.find('[data-testid="dateToTextField"').trigger('click')
    const dateToPicker = wrapper.find('[data-testid="dateToPicker"]')

    await dateToPicker.find('tr > td > button').trigger('click')
    expect(mutations.set).toHaveBeenCalled()
  })
  test('should emit correct action on timeFrom change', async () => {
    await wrapper.find('[data-testid="timeFromTextField"').trigger('click')
    await wrapper.find('[data-testid="timeFromPicker"]').trigger('click')
    expect(mutations.set).toHaveBeenCalled()
  })
  test('should emit correct action on timeTo change', async () => {
    await wrapper.find('[data-testid="timeToTextField"').trigger('click')
    await wrapper.find('[data-testid="timeToPicker"]').trigger('click')
    expect(mutations.set).toHaveBeenCalled()
  })

  test('should emit search action on search button click', async () => {
    await wrapper.find('[data-testid="searchButton"]').trigger('click')
    expect(actions['flights/getFlightsForAirport']).toHaveBeenCalled()
  })

  test('should emit correct action on clearDates click', () => {
    wrapper.find('[data-testid="clearTermsButton"]').trigger('click')
    expect(actions.clearToFromDates).toHaveBeenCalled()
  })

  test('should emit correct action on back click', () => {
    wrapper.find('[data-testid="backButton"]').trigger('click')
    expect(actions.clearCurrentAirport).toHaveBeenCalled()
  })

  test('should display arrivals column if there are any in the store', () => {
    expect(wrapper.find('[data-testid="arrivalsColumn"]')).toBeTruthy()
  })
  test('should display departures column if there are any in the store', () => {
    expect(wrapper.find('[data-testid="departuresColumn"]')).toBeTruthy()
  })
  test('should compute correct max and min dates', () => {
    expect(wrapper.vm.oneDayLess('2020-01-01')).toEqual('2019-12-31')
    expect(wrapper.vm.oneDayMore('2020-01-31')).toEqual('2020-02-01')
    expect(wrapper.vm.twelveHoursLess('04:00')).toEqual('16:00')
    expect(wrapper.vm.twelveHoursMore('13:00')).toEqual('01:00')
  })
})
