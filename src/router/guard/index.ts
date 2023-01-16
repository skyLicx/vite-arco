// 路由守卫
import type { Router } from 'vue-router'
import setupPermissionGuard from './permission'
import setupServerPermissionGuard from './serverPermission'

export default function createRouteGuard(router: Router) {
  setupPermissionGuard(router)
  setupServerPermissionGuard(router)
}
