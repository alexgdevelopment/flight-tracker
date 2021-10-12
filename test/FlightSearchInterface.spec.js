import { fireEvent, waitFor } from '@testing-library/vue'
import { Store } from 'vuex'
import { mockFlight } from './mockObjects'
import { renderWithVuetify } from './helpers'
import FlightSearchInterface from '@/components/FlightSearchInterface.vue'

describe('FlightSearchInterface', () => {
  let wrapper = null
  let store
  let state
  let actions
  let mutations

  describe('when there are not selected airports and no searches performed', () => {
    beforeEach(() => {
      state = {
        mainColor: 'green',
        searchStringParam: null,
      }
      actions = {
        search: jest.fn(),
        clearSearch: jest.fn(),
      }
      mutations = {
        setSearchStringParam: jest.fn(),
      }
      store = new Store({
        state,
        actions,
        mutations,
        modules: {
          flights: {
            flights: [mockFlight],
          },
        },
      })
      wrapper = renderWithVuetify(FlightSearchInterface, {
        store,
        stubs: {
          FlightCard: {
            template: '<div class="flight-card" />',
          },
        },
      })
    })
    test('should not show the search button if there is no search term', () => {
      expect(wrapper.queryByText('Go')).toBe(null)
    })

    test('should show error if there less than 2 characters in search term', async () => {
      expect(wrapper.queryByText('Min 2 characters')).toBe(null)
      await fireEvent.update(wrapper.getByLabelText('Flight number'), '1')
      await waitFor(() => {
        expect(wrapper.getByText('Min 2 characters')).toBeTruthy()
      })
    })
    test('should show error if there more than 10 characters in search term', async () => {
      expect(wrapper.queryByText('Max 10 characters')).toBe(null)
      await fireEvent.update(
        wrapper.getByLabelText('Flight number'),
        '1'.repeat(15)
      )
      await waitFor(() => {
        expect(wrapper.getByText('Max 10 characters')).toBeTruthy()
      })
    })
    test('should not show error if there are between 2 and 10 characters in search term', async () => {
      expect(wrapper.queryByText('Min 2 characters')).toBe(null)
      expect(wrapper.queryByText('Max 10 characters')).toBe(null)
      await fireEvent.update(
        wrapper.getByLabelText('Flight number'),
        '1'.repeat(5)
      )
      await waitFor(() => {
        expect(wrapper.queryByText('Min 2 characters')).toBe(null)
        expect(wrapper.queryByText('Max 10 characters')).toBe(null)
      })
    })

    test('should not display any flight cards', () => {
      expect(wrapper.queryAllByTestId('flightsContainer')).toHaveLength(0)
    })

    test('should match the snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('when there is a search term and search date entered', () => {
    beforeEach(() => {
      state = {
        mainColor: 'green',
        searchStringParam: '1',
        searchDate: '1',
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
          flights: {
            state: {
              flights: [mockFlight],
            },
          },
        },
      })
      wrapper = renderWithVuetify(FlightSearchInterface, {
        store,
        stubs: {
          FlightCard: {
            template: '<div class="flight-card" />',
          },
        },
      })
    })
    test('should show the search button', () => {
      expect(wrapper.getByText('Go'))
    })

    test('should dispatch search action when search button is clicked', async () => {
      await fireEvent.click(wrapper.getByText('Go'))
      expect(actions.search).toHaveBeenCalled()
    })
  })

  describe('when there are results to a flight search', () => {
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
          flights: {
            state: {
              flights: [mockFlight],
            },
          },
        },
      })
      wrapper = renderWithVuetify(FlightSearchInterface, {
        store,
        stubs: {
          FlightCard: {
            template: '<div class="flight-card" />',
          },
        },
      })
    })
    test('should display Flight Card', () => {
      expect(wrapper.getAllByTestId('flightsContainer')).toHaveLength(1)
    })
  })

  describe('when there are no results to a flight search', () => {
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
          flights: {
            state: {
              flights: [],
            },
          },
        },
      })
      wrapper = renderWithVuetify(FlightSearchInterface, {
        store,
        stubs: {
          FlightCard: {
            template: '<div class="flight-card" />',
          },
        },
      })
    })
    test('should display "No results."', () => {
      expect(wrapper.getByText('No results.'))
    })
  })
})
