import React, { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
import Block from "@/components/block/Block";
import Tabler from "@/components/tabler";
import styles from "./index.module.less";
import { useModels } from "./models";
import columns from "./columns";

const { Title } = Typography;
const Fragment = () => {
  const navigate = useNavigate();
  const { state, getList, dispatch } = useModels();
  const { pageNum, pageSize, updater, datalist, loading, total, list } = state;
  useEffect(() => {
    getList({ pageNum, pageSize });
  }, [updater, pageNum, pageSize]);

  const query = (values = {}) => dispatch({ pageNum: 1, ...values }); // 查询列表

  return (
    <Block className={styles.container} loading={loading}>
      <Title>概览</Title>
      <Tabler
        columns={columns}
        dataSource={datalist}
        actionsWidth={120}
        actions={[
          {
            key: "detail",
            content: "详情",
            onClick: () => navigate("/home"),
          },
          {
            key: "delete",
            content: "删除",
            confirm: "确认删除？",
            props: { danger: true },
            onClick: (record, index) => {
              console.log("删除", { record, index });
            },
          },
        ]}
        pagination={{ current: pageNum, pageSize: pageSize, total }}
        onPageChange={({ page, size }) => query({ page, pageSize: size })}
      />
    </Block>
  );
};

Fragment.defaultProps = {};

export default Fragment;
