import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Random } from "mockjs";
import { Breadcrumb, Typography } from "antd";
import styles from "./index.module.less";
import { RoutesProps } from "./config";

const { Link } = Typography;

interface BreadcrumbProps {
  configuration: RoutesProps;
  routes: RoutesProps[];
  accountInfo: any;
}
const Fragment: FC<BreadcrumbProps> = ({ configuration }) => {
  const navigate = useNavigate();
  const { name, breadcrumb } = configuration;

  return Array.isArray(breadcrumb) ? (
    <section className={styles.breadcrumb}>
      <Breadcrumb>
        {breadcrumb.map((item) => (
          <Breadcrumb.Item
            key={Random.id()}
            {...(item?.href ? { href: item.href } : {})}
            {...(item?.path
              ? { onClick: () => navigate(item.path || "") }
              : {})}
          >
            <Link>{item.name}</Link>
          </Breadcrumb.Item>
        ))}
        <Breadcrumb.Item key="current">{name}</Breadcrumb.Item>
      </Breadcrumb>
    </section>
  ) : null;
};

Fragment.defaultProps = {};

export default Fragment;
