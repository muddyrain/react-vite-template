/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Table } from 'antd';
import styles from './index.module.less';
import handles from './handles';

const Fragment = ({
  className,
  columns,
  dataSource,
  fixed,
  ordered,
  actionsWidth,
  actions,
  pagination,
  onPageChange,
  actionsProps,
  ...props
}) => {
  return (
    <Table
      className={`${styles.tabler} ${className}`}
      {...props}
      dataSource={dataSource}
      {...handles.procedureFixed({ fixed, columns })}
      columns={[
        ...handles.procedureColumns({ fixed, ordered, columns, pagination }),
        ...handles.procedureActions({ fixed, actionsWidth, actions, actionsProps }),
      ]}
      pagination={{
        size: 'default',
        showTotal: (value) => `共 ${value} 条`,
        ...pagination,
        onChange: (page, size) => {
          onPageChange({ page, size });
        },
      }}
    />
  );
};

Fragment.defaultProps = {
  className: '',
  /**
   * @param {columns} Array<Object>
   * [{
   *    ...,
   *    ellipsis: null, // Boolean，开启省略并启用 Tooltip
   *    visible: boolean | function -> (record, index) => reutn Boolean
   *    format: 'time', // 格式处理 => time 时间 | map 映射表 -> 非指定参数按 map 处理
   * }, ...]
   */
  columns: [],
  dataSource: [],
  fixed: false, // 是否标记滚动
  ordered: true, // 是否标记序号
  actionsWidth: null, // 操作列宽度
  /**
   * @param {actions} Array<Object>
   * [{
   *    content: '上下文', string | function -> (record, index) => reutn Element
   *    disabled: boolean | function -> (record, index) => reutn Boolean,
   *    visible: boolean | function -> (record, index) => reutn Boolean,
   *    loading: boolean | function -> (record, index) => reutn Boolean,
   *    onClick: (record, index) => {},
   *    confirm: '确认删除该条记录？', // 开启二次确认 => string | function -> (record, index) => reutn String | null, // 值为空(假)时不开启，默认不开启
   * }, ...]
   */
  actions: null,
  actionsProps: {}, // 操作列补充
  pagination: {},
  onPageChange: ({ page = 1, size = 10 }) => {},
  onReload: null, // 刷新 null | () => {}【未启用】
};

export default Fragment;
