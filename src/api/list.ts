import axios from 'axios'

// eslint-disable-next-line import/prefer-default-export
export function queryList() {
  return axios.get('/v1/top?type=Imdb&skip=0&limit=50&lang=Cn')
}
