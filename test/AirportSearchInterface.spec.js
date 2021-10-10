import { shallowMount } from '@vue/test-utils'
import { Store } from 'vuex'
import { mockAirport } from './mockObjects'
import AirportSearchInterface from '@/components/AirportSearchInterface.vue'

describe('AirportSearchInterface', () => {
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
        airports: {
          state: {
            airports: [mockAirport],
          },
        },
      },
    })
    wrapper = shallowMount(AirportSearchInterface, {
      store,
      stubs: {
        'v-text-field': {
          template: '<div class="v-text-field" />',
        },
        AirportCard: {
          template: '<div class="airport-card" />',
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
