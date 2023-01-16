import axios from 'axios'
// eslint-disable-next-line import/prefer-default-export
export function getMenuList() {
  return axios.get<any[]>('/admin/usr/role/listPrivs')
}
