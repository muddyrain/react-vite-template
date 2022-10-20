import { useNavigate } from "react-router-dom";
import {
  Layout,
  Typography,
  Row,
  Col,
  Button,
  Space,
  Avatar,
  Dropdown,
  Menu,
} from "antd";
import { LeftOutlined, ExportOutlined } from "@ant-design/icons";
import baseApi from "@/api/baseApi";
import styles from "./index.module.less";
import { FC } from "react";
import { RoutesProps } from "./config";

const { Header } = Layout;
const { Title, Text } = Typography;

interface HeaderProps {
  configuration: RoutesProps;
  routes: RoutesProps[];
  accountInfo: any;
}
const Fragment: FC<HeaderProps> = ({ accountInfo, configuration }) => {
  const navigate = useNavigate();
  const { name, breadcrumb } = configuration;

  return (
    <Header className={styles.header}>
      <Row style={{ height: 50 }} justify="space-between" align="middle">
        <Col>
          <Space>
            {(() => {
              if (Array.isArray(breadcrumb)) {
                const item = JSON.parse(JSON.stringify(breadcrumb)).pop();
                if (item?.path) {
                  return (
                    <Button
                      type="text"
                      icon={<LeftOutlined />}
                      onClick={() => navigate(item.path)}
                    />
                  );
                }
              }
            })()}
            <Title level={5} className={styles.title}>
              {name}
            </Title>
          </Space>
        </Col>
        <Col>
          {accountInfo?.token ? (
            <Dropdown
              overlay={
                <Menu
                  items={[
                    {
                      label: "退出登录",
                      key: "logout",
                      icon: <ExportOutlined />,
                    },
                  ]}
                  onClick={({ key }) => {
                    if (key === "logout") {
                      baseApi.Logout();
                      window.sessionStorage.removeItem("accountInfo");
                      navigate("/login");
                    }
                  }}
                />
              }
            >
              <span>
                <Avatar>{accountInfo?.name}</Avatar>
                <Text>{accountInfo?.name}</Text>
              </span>
            </Dropdown>
          ) : (
            <Button
              type="primary"
              danger
              size="small"
              onClick={() => navigate("/login")}
            >
              登录
            </Button>
          )}
        </Col>
      </Row>
    </Header>
  );
};

Fragment.defaultProps = {
  configuration: {},
  accountInfo: {},
};

export default Fragment;
