import { mount } from '@vue/test-utils'
import { mockAirport } from './mockObjects'
import AirportCard from '@/components/AirportCard.vue'

describe('Airport Card', () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = mount(AirportCard, {
      propsData: { airport: mockAirport },
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
