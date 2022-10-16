import React from "react";
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

const { Header } = Layout;
const { Title, Text } = Typography;

const Fragment = ({ accountInfo, configuration }) => {
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
                  onClick={({ key }) => {
                    if (key === "logout") {
                      baseApi.Logout();
                      window.sessionStorage.removeItem("accountInfo");
                      navigate("/login");
                    }
                  }}
                >
                  <Menu.Item key="logout" icon={<ExportOutlined />}>
                    退出登录
                  </Menu.Item>
                </Menu>
              }
            >
              <Space>
                <Avatar>{accountInfo?.name}</Avatar>
                <Text>{accountInfo?.name}</Text>
              </Space>
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
