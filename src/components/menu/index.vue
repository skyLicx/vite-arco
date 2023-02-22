<script lang="tsx">
  import { defineComponent, ref, h, compile, watch } from 'vue'
  import { useRouter, RouteRecordRaw } from 'vue-router'
  import { openWindow, regexUrl } from '@/utils'
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
        // Open external link
        if (regexUrl.test(item.path)) {
          openWindow(item.path)
          selectedKey.value = [item.name as string]
          return
        }
        console.log(item.name, 'item')
        router.push({
          name: item.name
        })
      }

      const findMenuOpenKeys = (target: string) => {
        const result: string[] = []
        let isFind = false
        const backtrack = (item: RouteRecordRaw, keys: string[]) => {
          if (item.name === target) {
            isFind = true
            result.push(...keys)
            return
          }
          if (item.children?.length) {
            item.children.forEach((el) => {
              backtrack(el, [...keys, el.name as string])
            })
          }
        }
        menuTree.value.forEach((el: RouteRecordRaw) => {
          if (isFind) return // Performance optimization
          backtrack(el, [el.name as string])
        })
        return result
      }

      watch(
        () => router.currentRoute.value,
        (route) => {
          const menuOpenKeys = findMenuOpenKeys(route.name as string)
          console.log(menuOpenKeys, 'menuOpenKeys')
          const keySet = new Set([...menuOpenKeys, ...openKeys.value])
          console.log(keySet, 'keySet')
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
