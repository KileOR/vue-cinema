import axios from 'axios'

export const API_KEY = 'b769a5a0bcf0ed38b9f8ae216013c02e'

const client = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
})

client.interceptors.request.use(function (config) {
  if (!config.params) {
    config.params = {}
  }
  config.params.api_key = API_KEY
  return config
})

export default client
