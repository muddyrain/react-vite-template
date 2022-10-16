import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Random } from 'mockjs';
import { Breadcrumb, Typography } from 'antd';
import styles from './index.module.less';

const { Link } = Typography;

const Fragment = ({ configuration }) => {
  const navigate = useNavigate();
  const { name, breadcrumb } = configuration;

  return (
    Array.isArray(breadcrumb) && (
      <section className={styles.breadcrumb}>
        <Breadcrumb>
          {breadcrumb.map((item) => (
            <Breadcrumb.Item
              key={Random.id()}
              {...(item?.href ? { href: item.href } : {})}
              {...(item?.path ? { onClick: () => navigate(item.path) } : {})}
            >
              <Link>{item.name}</Link>
            </Breadcrumb.Item>
          ))}
          <Breadcrumb.Item key="current">{name}</Breadcrumb.Item>
        </Breadcrumb>
      </section>
    )
  );  
};

Fragment.defaultProps = {
  configuration: {},
};

export default Fragment;
