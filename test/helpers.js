import Vuetify from 'vuetify'
import { render } from '@testing-library/vue'

/**
 * Adds a wrapping `div data-app="true"` to the body so that we don't
 * get Vuetify complaining about missing data-app attribute for some components.
 *
 * @return undefined
 */
export function addElemWithDataAppToBody() {
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.append(app)
}

export const renderWithVuetify = (component, options, callback) => {
  const root = document.createElement('div')
  root.setAttribute('data-app', 'true')

  return render(
    component,
    {
      container: document.body.appendChild(root),
      vuetify: new Vuetify(),
      ...options,
    },
    callback
  )
}
