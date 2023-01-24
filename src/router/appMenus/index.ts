import { appRoutes, appExternalRoutes } from '../routes'

// 获取所有的route
const mixinRoutes = [...appRoutes, ...appExternalRoutes]

const appClientMenus = mixinRoutes.map((el) => {
  const { name, path, meta, redirect, children } = el
  return {
    name,
    path,
    meta,
    redirect,
    children
  }
})

console.log(appClientMenus, '//')

export default appClientMenus
