import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import moment from "moment";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import Layouts, { routes } from "./layouts";
import "moment/locale/zh-cn";
import { RoutesProps } from "./layouts/config";
import { ReactNode } from "react";
import { Routes_DEFAULT_PATH } from "./constant";

moment.locale("zh-cn");

// 渲染路由
const renderRoute = (datasource = []) => {
  const list: ReactNode[] = [];
  const recursion = (data: RoutesProps[] = []) => {
    data.forEach((item: RoutesProps) => {
      if (Array.isArray(item?.children)) {
        recursion(item.children);
      } else {
        list.push(
          <Route
            key={item.path}
            path={item.path}
            element={
              <Layouts routes={datasource} configuration={item}>
                {item.element}
              </Layouts>
            }
          />
        );
      }
    });
  };
  recursion(datasource);
  return list;
};

const App = () => (
  <ConfigProvider locale={zhCN}>
    <HashRouter>
      <Routes>
        {renderRoute(routes)}
        <Route path="/" element={<Navigate to={Routes_DEFAULT_PATH} />} />
        <Route path="/*" element={<Layouts.NotFound />} />
      </Routes>
    </HashRouter>
  </ConfigProvider>
);

export default App;
