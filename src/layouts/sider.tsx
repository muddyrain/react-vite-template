import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { LOGO_PNG } from "@/assets";
import styles from "./index.module.less";
import { RoutesProps } from "@/router/interface";
import { HEADER_LOGO_TEXT } from "@/constant";
import { TransfromRoutesToMenusItems } from "@/utils/tools";

const { Sider } = Layout;
const { SubMenu } = Menu;

// 渲染菜单
const renderMenu = (datasource: RoutesProps[] = []) => {
  return datasource.map((item) => {
    const type = Object.prototype.toString.call(item?.hideMenu);
    if (!(type === "[object Boolean]" && item.hideMenu)) {
      if (Array.isArray(item?.children)) {
        return (
          <SubMenu icon={item?.icon} key={item.path} title={item.name}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item icon={item?.icon} key={item.path}>
            {item.name}
          </Menu.Item>
        );
      }
    }
  });
};

// 默认展示二级菜单
const handleOpenKeys = (datasource: RoutesProps[] = []): string[] =>
  datasource.map((e) => e.path as string);

const Fragment: FC<{
  routes: RoutesProps[];
  configuration: RoutesProps;
  accountInfo: any;
}> = ({ routes, configuration }) => {
  const navigate = useNavigate();
  // 递归 routes
  const menuList = TransfromRoutesToMenusItems(routes);
  return (
    <Sider theme="light" className={styles.sider} collapsed={false}>
      <div className={styles.logo}>
        <img src={LOGO_PNG} alt="" />
        <span>{HEADER_LOGO_TEXT}</span>
      </div>
      <Menu
        mode="inline"
        defaultOpenKeys={handleOpenKeys(routes)}
        selectedKeys={[
          (configuration?.parentPath as string) ||
            (configuration?.path as string),
        ]}
        items={menuList}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

Fragment.defaultProps = {
  routes: [],
  configuration: {},
};

export default Fragment;
