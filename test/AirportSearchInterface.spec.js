import { fireEvent, waitFor } from '@testing-library/vue'
import { Store } from 'vuex'
import { mockAirport } from './mockObjects'
import { renderWithVuetify } from './helpers'
import AirportSearchInterface from '@/components/AirportSearchInterface.vue'

describe('AirportSearchInterface', () => {
  let wrapper = null
  let store
  let state
  let actions
  let mutations

  describe(' when there are no selected airports and no searches performed', () => {
    beforeEach(() => {
      state = {
        mainColor: 'green',
        searchStringParam: null,
      }
      actions = {
        search: jest.fn(),
      }
      mutations = {
        setSearchStringParam: jest.fn(),
      }

      store = new Store({
        state,
        actions,
        mutations,
        modules: {
          airports: {
            state: {
              currentAirport: null,
              airports: [],
            },
          },
        },
      })
      wrapper = renderWithVuetify(AirportSearchInterface, {
        store,
        stubs: {
          AirportCard: {
            template: '<div class="airport-card" />',
          },
        },
      })
    })

    test('should not show the search button if there is no search term', () => {
      expect(wrapper.queryByText('Go')).toBe(null)
    })

    test('should show error if there less than 3 characters in search term', async () => {
      expect(wrapper.queryByText('Min 3 characters')).toBe(null)
      await fireEvent.update(wrapper.getByTestId('searchField'), '1')
      await waitFor(() => {
        expect(wrapper.getByText('Min 3 characters')).toBeTruthy()
      })
    })
    test('should show error if there more than 10 characters in search term', async () => {
      expect(wrapper.queryByText('Max 10 characters')).toBe(null)
      await fireEvent.update(wrapper.getByTestId('searchField'), '1'.repeat(15))
      await waitFor(() => {
        expect(wrapper.getByText('Max 10 characters')).toBeTruthy()
      })
    })
    test('should not show error if there are between 3 and 10 characters in search term', async () => {
      expect(wrapper.queryByText('Min 3 characters')).toBe(null)
      expect(wrapper.queryByText('Max 10 characters')).toBe(null)
      await fireEvent.update(wrapper.getByTestId('searchField'), '1'.repeat(5))
      await waitFor(() => {
        expect(wrapper.queryByText('Min 3 characters')).toBe(null)
        expect(wrapper.queryByText('Max 10 characters')).toBe(null)
      })
    })

    test('should not display any airport cards', () => {
      expect(wrapper.queryAllByTestId('airportsContainer')).toHaveLength(0)
    })

    test('should match the snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('when there is a search term entered', () => {
    beforeEach(() => {
      state = {
        mainColor: 'green',
        searchStringParam: '1',
      }
      actions = {
        search: jest.fn(),
      }
      mutations = {
        setSearchStringParam: jest.fn(),
      }

      store = new Store({
        state,
        actions,
        mutations,
        modules: {
          airports: {
            state: {
              currentAirport: null,
              airports: [mockAirport],
            },
          },
        },
      })
      wrapper = renderWithVuetify(AirportSearchInterface, {
        store,
        stubs: {
          AirportCard: {
            template: '<div class="airport-card" />',
          },
        },
      })
    })
    test('should show the search button', () => {
      expect(wrapper.getByText('Go'))
    })
  })

  describe('when there are results to an airport search', () => {
    beforeEach(() => {
      state = {
        mainColor: 'green',
        searchStringParam: null,
      }
      actions = {
        search: jest.fn(),
      }
      mutations = {
        setSearchStringParam: jest.fn(),
      }

      store = new Store({
        state,
        actions,
        mutations,
        modules: {
          airports: {
            state: {
              currentAirport: null,
              airports: [mockAirport],
            },
          },
        },
      })
      wrapper = renderWithVuetify(AirportSearchInterface, {
        store,
        stubs: {
          AirportCard: {
            template: '<div class="airport-card" />',
          },
        },
      })
    })
    test('should display Airport Card', () => {
      expect(wrapper.getAllByTestId('airportsContainer')).toHaveLength(1)
    })
  })

  describe('when there are no results to an airport search', () => {
    beforeEach(() => {
      state = {
        mainColor: 'green',
        searchStringParam: null,
      }
      actions = {
        search: jest.fn(),
      }
      mutations = {
        setSearchStringParam: jest.fn(),
      }

      store = new Store({
        state,
        actions,
        mutations,
        modules: {
          airports: {
            state: {
              currentAirport: null,
              airports: [],
            },
          },
        },
      })
      wrapper = renderWithVuetify(AirportSearchInterface, {
        store,
        stubs: {
          AirportCard: {
            template: '<div class="airport-card" />',
          },
        },
      })
    })
    test('should display "No results."', () => {
      expect(wrapper.getByText('No results.'))
    })
  })
  describe('when there is an airport selected', () => {
    beforeEach(() => {
      state = {
        mainColor: 'green',
        searchStringParam: null,
      }
      actions = {
        search: jest.fn(),
      }
      mutations = {
        setSearchStringParam: jest.fn(),
      }

      store = new Store({
        state,
        actions,
        mutations,
        modules: {
          airports: {
            state: {
              currentAirport: mockAirport,
              airports: [],
            },
          },
        },
      })
      wrapper = renderWithVuetify(AirportSearchInterface, {
        store,
        stubs: {
          AirportCard: {
            template: '<div class="airport-card" />',
          },
          AirportDetail: {
            template:
              '<div class="airport-detail" data-testid="airportDetail" />',
          },
        },
      })
    })
    test('should display Airport Detail', () => {
      expect(wrapper.getAllByTestId('airportDetail')).toHaveLength(1)
    })
  })
})
