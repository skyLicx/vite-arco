import { createPinia } from 'pinia'
import usePermissionStore from './modules/permission'
import useTabBarStore from './modules/tab-bar'
import useUserStore from './modules/user'

const pinia = createPinia()
export { usePermissionStore, useTabBarStore, useUserStore }
export default pinia
