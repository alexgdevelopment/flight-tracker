import { mount } from '@vue/test-utils'
import { Store } from 'vuex'
import { mockFlight } from './mockObjects'
import FlightSearchInterface from '@/components/FlightSearchInterface.vue'

describe('FlightSearchInterface', () => {
  let wrapper = null
  let store
  let state

  beforeEach(() => {
    state = {
      mainColor: 'green',
    }
    store = new Store({
      state,
      modules: {
        flights: {
          arrivals: [mockFlight],
          departures: [mockFlight],
        },
      },
    })
    wrapper = mount(FlightSearchInterface, {
      store,
      stubs: {
        'v-text-field': {
          template: '<div class="v-text-field" />',
        },
        FlightCard: {
          template: '<div class="flight-card" />',
        },
      },
    })
  })
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
