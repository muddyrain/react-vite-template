import React, { useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from 'antd';
import Block from '@/components/block';
import Tabler from '@/components/tabler';
import styles from './index.module.less';
import Models from './models';
import columns from './columns';

const $models = new Models();
const { Title } = Typography;

const Fragment = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer($models.reducer, $models.initialState);
  const { updater, loading, processing, datalist, page, pageSize, total } = state;
  $models.assign(dispatch);

  useEffect(() => {
    $models.List({ page, pageSize });
  }, [updater, page, pageSize]);

  const query = (values = {}) => dispatch({ page: 1, ...values }); // 查询列表

  return (
    <Block className={styles.container} loading={loading}>
      <Title>概览</Title>
      <Tabler
        columns={columns}
        dataSource={datalist}
        actionsWidth={120}
        actions={[
          {
            key: 'detail',
            content: '详情',
            onClick: () => navigate('/home'),
          },
          {
            key: 'delete',
            content: '删除',
            confirm: '确认删除？',
            props: { danger: true },
            onClick: (record, index) => {
              console.log('删除', { record, index });
            },
          },
        ]}
        pagination={{ page, size: pageSize, total }}
        onPageChange={({ page, size }) => query({ page, pageSize: size })}
      />
    </Block>
  );
};

Fragment.defaultProps = {};

export default Fragment;
