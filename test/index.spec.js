import { Store } from 'vuex'
import { renderWithVuetify } from './helpers'
import index from '@/pages/index.vue'
import searchTypeMixin from '@/assets/mixins/searchTypeMixin.js'
import { SEARCH_TYPE } from '@/assets/constants.js'

describe('The "index" page', () => {
  let wrapper = null
  let store
  let state

  describe('when there is no search type selected', () => {
    beforeEach(() => {
      state = {
        searchType: SEARCH_TYPE.NOT_SELECTED,
      }
      store = new Store({
        state,
      })
      wrapper = renderWithVuetify(index, {
        store,
        mixins: [searchTypeMixin],
        stubs: {
          SearchTypeSelector: {
            template: `<div data-testid='search-type-selector' />`,
          },
          FlightSearchInterface: {
            template: `<div data-testid='flight-search-interface' />`,
          },
          AirportSearchInterface: {
            template: `<div data-testid='airport-search-interface' />`,
          },
        },
      })
    })

    test('should match the snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })

    test('should show a SearchTypeSelector', () => {
      expect(wrapper.getByTestId('search-type-selector'))
    })

    test('should not show search interfaces', () => {
      expect(wrapper.queryByTestId('flight-search-interface')).toBe(null)
      expect(wrapper.queryByTestId('airport-search-interface')).toBe(null)
    })
  })
  describe('when search type is flights', () => {
    beforeEach(() => {
      state = {
        searchType: SEARCH_TYPE.FLIGHT,
      }
      store = new Store({
        state,
      })
      wrapper = renderWithVuetify(index, {
        store,
        mixins: [searchTypeMixin],
        stubs: {
          SearchTypeSelector: {
            template: `<div data-testid='search-type-selector' />`,
          },
          FlightSearchInterface: {
            template: `<div data-testid='flight-search-interface' />`,
          },
          AirportSearchInterface: {
            template: `<div data-testid='airport-search-interface' />`,
          },
        },
      })
    })

    test('should show a SearchTypeSelector', () => {
      expect(wrapper.getByTestId('search-type-selector'))
    })
    test('should show a FlightSearchInteface', () => {
      expect(wrapper.getByTestId('flight-search-interface'))
    })

    test('should not show AirportSearchInterface', () => {
      expect(wrapper.queryByTestId('airport-search-interface')).toBe(null)
    })
  })
  describe('when the search type is airport', () => {
    beforeEach(() => {
      state = {
        searchType: SEARCH_TYPE.AIRPORT,
      }
      store = new Store({
        state,
      })
      wrapper = renderWithVuetify(index, {
        store,
        mixins: [searchTypeMixin],
        stubs: {
          SearchTypeSelector: {
            template: `<div data-testid='search-type-selector' />`,
          },
          FlightSearchInterface: {
            template: `<div data-testid='flight-search-interface' />`,
          },
          AirportSearchInterface: {
            template: `<div data-testid='airport-search-interface' />`,
          },
        },
      })
    })

    test('should show a SearchTypeSelector', () => {
      expect(wrapper.getByTestId('search-type-selector'))
    })
    test('should show an AirportSearchInteface', () => {
      expect(wrapper.getByTestId('airport-search-interface'))
    })

    test('should not show FlightSearchInterface', () => {
      expect(wrapper.queryByTestId('flight-search-interface')).toBe(null)
    })
  })
})
