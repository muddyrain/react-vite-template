import { Icon } from '@bees/ui'
import Home from '@/pages/home'
import Dashboard from '@/pages/dashboard'
import SmartCity from '@/pages/smart-city'
import SmartPark from '@/pages/smart-park'
import Login from '@/pages/login'
import SystemSettings from '@/pages/system-settings'
import ComponentsManagement from '@/pages/components-management'
import Ongoing from '@/pages/project-management/ongoing'
import Delivered from '@/pages/project-management/delivered'
import { RoutesProps } from './interface'

/**
 * @param {String} path 同作 key 用，保证所在有层级中的唯一性
 * @param {Boolean} pure 纯净的 false
 * @param {Boolean} hideMenu 不显示在菜单 false
 * @param {Object} style 额外样式
 * @param {Array} breadcrumb 面包屑 => null 不显示 | [{ name, link: '路由方式', href: '链接方式' }, ...]
 * @param {Boolean} needLogin 登录验证拦截 => false 无需验证拦截、true 开启验证拦截，默认：true
 * @param {Boolean} parentPath 父路径
 */
const routes: RoutesProps[] = [
  {
    name: '登录',
    path: '/login',
    element: <Login />,
    pure: true,
    hideMenu: true
  },
  {
    icon: <Icon type='home' />,
    name: '首页',
    path: '/home',
    element: <Home />
  },
  {
    name: '仪表盘',
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    name: '智慧城市',
    path: '/smart-city',
    element: <SmartCity />
  },
  {
    name: '智慧园区',
    path: '/smart-park',
    element: <SmartPark />
  },
  {
    name: '组件管理',
    path: '/components-managament',
    children: [
      {
        name: '滚动表格',
        path: '/scroll-table',
        element: <ComponentsManagement.ScrollTable />
      }
    ]
  },
  {
    name: '系统设置',
    path: '/system-settings',
    children: [
      {
        name: '角色管理',
        path: '/role-management',
        element: <SystemSettings.RoleManagement />
      },
      {
        name: '权限配置',
        path: '/permission-quota',
        parentPath: '/role-management',
        hideMenu: true,
        element: <SystemSettings.PermissionQuota />
      },
      {
        name: '菜单管理',
        path: '/menu-management',
        element: <SystemSettings.MenuManagement />
      },
      {
        name: '组织管理',
        path: '/organizational-management',
        element: <SystemSettings.OrganizationalManagement />
      },
      {
        name: '用户管理',
        path: '/user-management',
        element: <SystemSettings.UserManagement />
      },
      {
        name: '系统日志',
        path: '/log-management',
        element: <SystemSettings.LogManagement />
      }
    ]
  },
  {
    icon: <Icon type='file-text' />,
    name: '项目管理',
    path: '/project-management',
    children: [
      {
        name: '进行中',
        path: '/ongoing',
        element: <Ongoing />,
        breadcrumb: [{ name: '首页', link: '/home' }]
      },
      {
        name: '已交付',
        path: '/delivered',
        element: <Delivered />,
        breadcrumb: [{ name: '概览', link: '/overview' }]
      }
    ]
  }
]

export default routes
