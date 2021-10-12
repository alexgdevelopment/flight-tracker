import { renderWithVuetify } from './helpers'
import { mockFlight } from './mockObjects'
import FlightCard from '@/components/FlightCard.vue'

describe('Flight Card', () => {
  let wrapper = null
  describe('if all data is passed', () => {
    beforeEach(() => {
      wrapper = renderWithVuetify(FlightCard, {
        propsData: { flight: mockFlight },
      })
    })

    it('should match the snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })

    describe('should display', () => {
      test('flight number', () => {
        expect(wrapper.findByText(mockFlight.number))
      })
      test('departure airport name', () => {
        expect(wrapper.findByText(mockFlight.departure.airport.name))
      })
      test('departure scheduled local time', () => {
        expect(
          wrapper.findByText(
            new Date(mockFlight.departure.scheduledTimeLocal).toTimeString()
          )
        )
      })
      test('arrival airport name', () => {
        expect(wrapper.findByText(mockFlight.arrival.airport.name))
      })
      test('arrival scheduled local time', () => {
        expect(
          wrapper.findByText(
            new Date(mockFlight.arrival.scheduledTimeLocal).toTimeString()
          )
        )
      })
      test('flight status', () => {
        expect(wrapper.findByText(mockFlight.status))
      })
    })
  })
})
