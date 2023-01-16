import type { RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'

declare module 'vue-router' {
  // route mate的类型定义 有些参数目前没用到
  interface RouteMeta {
    roles?: string[]; // Controls roles that have access to the page
    requiresAuth: boolean; // Whether login is required to access the current page (every route must declare)
    icon?: string; // The icon show in the side menu
    locale?: string; // The locale name show in side menu and breadcrumb
    hideInMenu?: boolean; // If true, it is not displayed in the side menu
    hideChildrenInMenu?: boolean; // if set true, the children are not displayed in the side menu
    activeMenu?: string; // if set name, the menu will be highlighted according to the name you set
    order?: number; // Sort routing menu items. If set key, the higher the value, the more forward it is
    noAffix?: boolean; // if set true, the tag will not affix in the tab-bar
    ignoreCache?: boolean; // if set true, the page will not be cached
  }
}

type Component<T = any> =
	| ReturnType<typeof defineComponent>
	| (() => Promise<typeof import('*.vue')>)
	| (() => Promise<T>)

// 全局定义
declare global {
	interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
		name?: string
		meta?: RouteMeta
		component?: Component | string
		children?: AppRouteRecordRaw[]
		props?: any
		fullPath?: string
	}

	// interface AppCustomRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
	// 	name: string
	// 	meta: RouteMeta
	// 	component?: Component | string
	// 	children?: AppRouteRecordRaw[]
	// 	redirect: string
	// }
}
