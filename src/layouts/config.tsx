import React from "react";
import { Icon } from "@bees/ui";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Overview from "@/pages/overview";
import Ongoing from "@/pages/project-management/ongoing";
import Delivered from "@/pages/project-management/delivered";

/**
 * @param {String} path 同作 key 用，保证所在有层级中的唯一性
 * @param {Boolean} pure 纯净的 false
 * @param {Boolean} hideMenu 不显示在菜单 false
 * @param {Object} style 额外样式
 * @param {Array} breadcrumb 面包屑 => null 不显示 | [{ name, link: '路由方式', href: '链接方式' }, ...]
 * @param {Boolean} needLogin 登录验证拦截 => false 无需验证拦截、true 开启验证拦截，默认：true
 * @param {Boolean} parentPath 父路径
 */
export interface RoutesProps {
  name?: string;
  path?: string;
  pure?: boolean;
  hideMenu?: boolean;
  style?: React.CSSProperties | undefined;
  breadcrumb?: { name?: string; link?: string; href?: string; path?: string }[];
  needLogin?: string;
  parentPath?: string;
  element?: React.ReactNode;
  icon?: React.ReactNode;
  children?: RoutesProps[];
  auths?: string[];
}
const routes: RoutesProps[] = [
  {
    name: "登录",
    path: "/login",
    element: <Login />,
    pure: true,
    hideMenu: true,
  },
  {
    icon: <Icon type="home" />,
    name: "首页",
    path: "/home",
    element: <Home />,
  },
  {
    icon: <Icon type="dashboard-2" />,
    name: "概览",
    path: "/overview",
    element: <Overview />,
  },
  {
    icon: <Icon type="file-text" />,
    name: "项目管理",
    path: "/project-management",
    children: [
      {
        name: "进行中",
        path: "/ongoing",
        element: <Ongoing />,
        breadcrumb: [{ name: "首页", link: "/home" }],
        parentPath: "/home",
      },
      {
        name: "已交付",
        path: "/delivered",
        element: <Delivered />,
        breadcrumb: [{ name: "概览", link: "/overview" }],
        parentPath: "/overview",
      },
    ],
  },
];

export default routes;
