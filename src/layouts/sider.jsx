import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { LOGO_PNG } from '@/assets';
import styles from './index.module.less';

const { Sider } = Layout;
const { SubMenu } = Menu;

// 渲染菜单
const renderMenu = (datasource = []) => {
  return datasource.map((item) => {
    const type = Object.prototype.toString.call(item?.hideMenu);
    if (!(type === '[object Boolean]' && item.hideMenu)) {
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
const handleOpenKeys = (datasource = []) => datasource.map((e) => e.path);

const Fragment = ({ routes, configuration }) => {
  const navigate = useNavigate();

  return (
    <Sider className={styles.sider} collapsed={false}>
      <img className={styles.logo} src={LOGO_PNG} />
      <Menu
        mode="inline"
        theme="dark"
        defaultOpenKeys={handleOpenKeys(routes)}
        selectedKeys={[configuration?.parentPath || configuration?.path]}
        onClick={({ key }) => navigate(key)}
      >
        {renderMenu(routes)}
      </Menu>
    </Sider>
  );
};

Fragment.defaultProps = {
  routes: [],
  configuration: {},
};

export default Fragment;
