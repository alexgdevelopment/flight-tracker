import { mount } from '@vue/test-utils'
import { mockFlight } from './mockObjects'
import FlightCard from '@/components/FlightCard.vue'

describe('Flight Card', () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = mount(FlightCard, {
      propsData: { flight: mockFlight },
    })
  })
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  test('has a v-card element', () => {
    expect(wrapper.find('.v-card')).toBeTruthy()
  })
})
