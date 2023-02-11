import axios from 'axios'
import type { RouteRecordNormalized } from 'vue-router'

// eslint-disable-next-line import/prefer-default-export
export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/mock/user/menu')
}
