import { shallowMount } from '@vue/test-utils'
import { Store } from 'vuex'
import { mockAirport } from './mockObjects'
import AirportDetail from '@/components/AirportDetail.vue'
describe('Airport Detail', () => {
  let wrapper = null
  let state
  let store

  beforeEach(() => {
    state = {
      mainColor: 'green',
    }
    store = new Store({
      state,
      modules: {
        airports: {
          state: {
            currentAirport: mockAirport,
          },
        },
        flights: {
          state: {
            arrivals: [],
            departures: [],
          },
        },
      },
    })
    wrapper = shallowMount(AirportDetail, {
      stubs: {
        AirportCard: {
          template: '<div class="airport-card" />',
        },
        'v-text-field': {
          template: '<div class="v-text-field" />',
        },
      },
      store,
    })
  })
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
