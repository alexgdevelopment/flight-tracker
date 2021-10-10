import { mount } from '@vue/test-utils'
import { Store } from 'vuex'
import SearchTypeSelector from '@/components/SearchTypeSelector.vue'

describe('Search type selector', () => {
  let wrapper = null
  let store
  let state

  beforeEach(() => {
    state = {
      mainColor: 'green',
    }
    store = new Store({
      state,
    })
    wrapper = mount(SearchTypeSelector, {
      store,
      stubs: {
        'v-radio': {
          template: "<div class='v-radio' />",
        },
      },
    })
  })
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
