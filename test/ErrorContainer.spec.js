import { mount } from '@vue/test-utils'
import { Store } from 'vuex'
import ErrorContainer from '@/components/ErrorContainer.vue'

describe('ErrorContainer', () => {
  let wrapper = null
  let store

  beforeEach(() => {
    store = new Store({})

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
})
