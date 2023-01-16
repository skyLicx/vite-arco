<script lang="tsx">
  import { defineComponent, ref, h, compile, computed, watch } from 'vue'
  import { useRoute, useRouter, RouteRecordRaw } from 'vue-router'
  import type { RouteMeta } from 'vue-router'
  import useMenuTree from './useMenuTree'

  export default defineComponent({
    emit: ['collapse'],
    setup() {
      const router = useRouter()
      const collapsed = ref(true)
      // 展开项
      const openKeys = ref<string[]>([])
      // 选中项
      const selectedKey = ref<string[]>([])

      // 路由菜单
      const { menuTree } = useMenuTree()

      // 路由跳转
      const goto = (item: RouteRecordRaw) => {
        router.push({
          name: item.name
        })
      }

      const findMenuOpenKeys = (name: string) => {
        const result: string[] = []
        let isFind = false
        const backtrack = (
          item: RouteRecordRaw,
          keys: string[],
          target: string
        ) => {
          if (item.name === target) {
            isFind = true
            result.push(...keys, item.name as string)
            return
          }
          if (item.children?.length) {
            item.children.forEach((el) => {
              backtrack(el, [...keys], target)
            })
          }
        }
        menuTree.value.forEach((el: RouteRecordRaw) => {
          if (isFind) return
          // 先把首层的name放进去
          backtrack(el, [el.name as string], name)
        })
        return result
      }

      watch(
        () => router.currentRoute.value,
        (route) => {
          const menuOpenKeys = findMenuOpenKeys(route.name as string)
          const keySet = new Set([...menuOpenKeys, ...openKeys.value])
          openKeys.value = [...keySet]
          selectedKey.value = [menuOpenKeys[menuOpenKeys.length - 1]]
        },
        {
          immediate: true
        }
      )

      // 侧边栏render
      const renderSubMenu = () => {
        function travel(_route: RouteRecordRaw[], nodes = []) {
          if (_route) {
            _route.forEach((element) => {
              // 菜单图标
              const icon = element?.meta?.icon
                ? () => h(compile(`<${element?.meta?.icon}/>`))
                : null
              // 有children渲染一级菜单 没有就渲染子菜单
              const node =
                element?.children && element?.children.length !== 0 ? (
                  <a-sub-menu
                    key={element?.name}
                    v-slots={{
                      icon,
                      title: () => h(compile(element?.meta?.locale || ''))
                    }}
                  >
                    {travel(element?.children)}
                  </a-sub-menu>
                ) : (
                  <a-menu-item
                    key={element?.name}
                    v-slots={{ icon }}
                    onClick={() => goto(element)}
                  >
                    {element?.meta?.locale || ''}
                  </a-menu-item>
                )
              nodes.push(node as never)
            })
          }
          return nodes
        }
        return travel(menuTree.value)
      }
      return () => (
        <a-menu
          v-model:open-keys={openKeys.value}
          selected-keys={selectedKey.value}
          auto-open-selected={true}
          level-indent={34}
          style="height: 100%"
        >
          {renderSubMenu()}
        </a-menu>
      )
    }
  })
</script>