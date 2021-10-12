import { fireEvent } from '@testing-library/dom'
import { Store } from 'vuex'
import { renderWithVuetify } from './helpers'
import SearchTypeSelector from '@/components/SearchTypeSelector.vue'

describe('Search type selector', () => {
  let wrapper = null
  let store
  let state
  let actions

  beforeEach(() => {
    state = {
      mainColor: 'green',
    }
    actions = {
      changeSearchType: jest.fn(),
    }
    store = new Store({
      state,
      actions,
    })
    wrapper = renderWithVuetify(SearchTypeSelector, {
      store,
    })
  })

  test('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should display "Airports" and "Flights" radio buttons', () => {
    expect(wrapper.getByText('Airports'))
    expect(wrapper.getByText('Flights'))
  })

  test('should emit the proper event on button select', () => {
    fireEvent.click(wrapper.getByText('Airports'))
    expect(actions.changeSearchType).toHaveBeenCalled()
  })
})
