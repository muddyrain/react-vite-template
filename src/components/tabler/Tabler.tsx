/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
import React, { FC } from "react";
import {
  ButtonProps,
  PaginationProps,
  Table,
  TableColumnType,
  TableProps,
} from "antd";
import styles from "./index.module.less";
import handles from "./handles";
export type RecordType = object;
export interface TablerActionsProps {
  key?: string;
  confirm?: string | ((record: RecordType, index: number) => string);
  visible?: boolean | ((record: RecordType, index: number) => boolean);
  loading?: boolean | ((record: RecordType, index: number) => boolean);
  disabled?: boolean | ((record: RecordType, index: number) => boolean);
  props?: ButtonProps;
  content:
    | React.ReactNode
    | ((record: RecordType, index: number) => React.ReactNode);
  onClick?: (record: RecordType, index: number) => void;
}
export interface TablerProps extends TableProps<any> {
  /** 样式名 */
  className?: string;
  /** 表格行 key 的取值 */
  rowKey?: string;
  /** 表格列的配置描述 */
  columns?: TableColumnType<RecordType>[];
  /** 数据源 */
  dataSource?: RecordType[];
  /** 表格加载中 */
  loading?: boolean;
  /** 是否标记滚动 */
  fixed?: boolean;
  /** 是否标记序号 */
  ordered?: boolean;
  /** 操作栏的宽度 */
  actionsWidth?: number | string | undefined;
  /** 操作栏数据 */
  actions?: TablerActionsProps[];
  /** 分页 */
  pagination?: PaginationProps;
  /** 监听分页变化 */
  onPageChange?: (obj: { page: number; size: number }) => void;
  /** 操作栏配置项 */
  actionsProps?: TableColumnType<RecordType>;
}

const Tabler: FC<TablerProps> = ({
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
        ...handles.procedureActions({
          fixed,
          actionsWidth,
          actions,
          actionsProps,
        }),
      ]}
      pagination={{
        size: "default",
        showTotal: (value) => `共 ${value} 条`,
        ...pagination,
        onChange: (page, size) => {
          onPageChange!({ page, size });
        },
      }}
    />
  );
};

Tabler.defaultProps = {
  className: "",
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
  rowKey: "id",
  dataSource: [],
  fixed: false, // 是否标记滚动
  ordered: true, // 是否标记序号
  actionsWidth: undefined, // 操作列宽度
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
  actions: [],
  actionsProps: {}, // 操作列补充
  pagination: {},
  onPageChange: ({ page = 1, size = 10 }) => null,
};

export default Tabler;
