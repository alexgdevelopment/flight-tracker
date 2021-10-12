import { mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { mockAirport } from './mockObjects'
import AirportCard from '@/components/AirportCard.vue'

describe('Airport Card', () => {
  let wrapper = null
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(AirportCard, {
      vuetify,
      propsData: { airport: mockAirport },
    })
  })
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  test('should display correct name', () => {
    const airportName = wrapper.find('[data-testid="airportName"]').text()
    expect(airportName).toMatch(mockAirport.fullName)
  })

  test('should display correct country name', () => {
    const airportCountry = wrapper
      .find('[data-testid="airportCountryName"]')
      .text()
    expect(airportCountry).toMatch(mockAirport.country.name)
  })
})
