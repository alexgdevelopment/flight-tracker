import { mount } from '@vue/test-utils'
import { Store } from 'vuex'
import ErrorContainer from '@/components/ErrorContainer.vue'

describe('ErrorContainer', () => {
  let wrapper = null
  let store
  let state
  const testString = 'test'

  beforeEach(() => {
    state = {
      errorMessage: testString,
    }
    store = new Store({
      state,
    })

    wrapper = mount(ErrorContainer, {
      store,
    })
  })
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  test('should display the passed error message', () => {
    expect(wrapper.text()).toBe(testString)
  })
})
