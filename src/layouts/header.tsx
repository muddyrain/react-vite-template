import { useNavigate } from "react-router-dom";
import { LOGO_PNG } from "@/assets";
import { HEADER_LOGO_TEXT } from "@/constant";
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
import { RoutesProps } from "@/router/interface";

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
      <div className={styles.logo}>
        <img src={LOGO_PNG} alt="" />
        <span>{HEADER_LOGO_TEXT}</span>
      </div>
      <div className="flex-1 flex">
        <div className="flex">
          <Space>
            <Title level={5} className={styles.title}>
              {name}
            </Title>
          </Space>
        </div>
        <div className="flex ml-auto">
          {accountInfo?.token ? (
            <Dropdown
              menu={{
                items: [
                  {
                    label: "退出登录",
                    key: "logout",
                    icon: <ExportOutlined />,
                  },
                ],
                onClick: ({ key }) => {
                  if (key === "logout") {
                    baseApi.Logout();
                    window.sessionStorage.removeItem("accountInfo");
                    navigate("/login");
                  }
                },
              }}
            >
              <span>
                <Avatar>{accountInfo?.userName}</Avatar>
                <Text className="ml-1">{accountInfo?.userName}</Text>
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
        </div>
      </div>
    </Header>
  );
};

Fragment.defaultProps = {
  configuration: {},
  accountInfo: {},
};

export default Fragment;
