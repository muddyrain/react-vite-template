import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import styles from "./index.module.less";
import { RoutesProps } from "./config";
import Header from "./header";
import Footer from "./footer";
import Sider from "./sider";
import Breadcrumb from "./breadcrumb";

const { Content } = Layout;

export interface LayoutProps {
  routes: RoutesProps[];
  configuration: RoutesProps;
  children: React.ReactNode;
}
const Fragment: FC<LayoutProps> = ({ routes, configuration, children }) => {
  const navigate = useNavigate();
  const accountJSON = window.sessionStorage.getItem("accountInfo");
  const accountInfo = JSON.parse(accountJSON || "{}");
  const pureType = Object.prototype.toString.call(configuration?.pure);

  useEffect(() => {
    const needLoginType = Object.prototype.toString.call(
      configuration?.needLogin
    );
    if (!(needLoginType === "[object Boolean]" && !configuration.needLogin)) {
      !accountInfo?.token && navigate("/login");
    }
  }, [configuration]);

  if (pureType === "[object Boolean]" && pureType) {
    return (
      <section style={configuration?.style || {}}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child as any, {
            authority: configuration?.auths || [],
          })
        )}
      </section>
    );
  } else {
    return (
      <Layout className={styles.layout}>
        <Sider
          routes={routes}
          configuration={configuration}
          accountInfo={accountInfo}
        />
        <Layout className={styles.body}>
          <Header
            routes={routes}
            configuration={configuration}
            accountInfo={accountInfo}
          />
          <Breadcrumb
            routes={routes}
            configuration={configuration}
            accountInfo={accountInfo}
          />
          <Content className={styles.content}>
            <section>
              {React.Children.map(children, (child) =>
                React.cloneElement(child as any, {
                  authority: configuration?.auths || [],
                })
              )}
            </section>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
};

Fragment.defaultProps = {
  configuration: {},
  routes: [],
};

export default Fragment;
