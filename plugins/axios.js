import axios from 'axios'
export default function ({ store }) {
  axios.interceptors.request.use(
    (config) => {
      store.commit('setLoading', true)
      return config
    },
    (e) => {
      store.commit('setLoading', false)
      console.log(e)
      return Promise.reject(e)
    }
  )
  axios.interceptors.response.use(
    (config) => {
      store.commit('setLoading', false)
      return config
    },
    (e) => {
      store.commit('setLoading', false)
      console.log(e)
      return Promise.reject(e)
    }
  )
}
